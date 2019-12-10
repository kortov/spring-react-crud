import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import axios from 'axios';

export const LOGIN_REQUEST = '[AUTHENTICATION] LOGIN_REQUEST';
export const LOGOUT_REQUEST = '[AUTHENTICATION] LOGOUT_REQUEST';

const hostname = window.location.hostname;

export const Actions = {
    loginRequest: (username: string) => createAction(LOGIN_REQUEST, username),
    logoutRequest: () => createAction(LOGOUT_REQUEST),
};

export const Thunks = {
    loginRequest: (username: string, password: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.loginRequest(username));
            const config = {
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({username, password}),
            };
            const promise = axios.post(`http://${hostname}:8080/api/auth/signin`, config);
            promise
                .then(Thunks.handleResponse)
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    return user;
                });
        };
    },
    logout: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.logoutRequest());
            localStorage.removeItem('user');
        };
    },
    handleResponse: (response: any) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    Thunks.logout();
                    location.reload();
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
