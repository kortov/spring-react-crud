import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import axios from 'axios';
import {history} from '@store';
import {Actions as alertActions} from '@store/alerts';

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
            const promise = axios.post('http://' + hostname + ':8080/api/auth/signin', {
                usernameOrEmail: username,
                password: password,
            });
            promise
                .then((data: any) => {
                    const element = `${data.data.tokenType}:${data.data.accessToken}`;
                    localStorage.setItem('user', element);
                    dispatch(alertActions.success('Login successfully'));
                    history.push('/');
                }, () => {
                    Thunks.logout();
                    dispatch(alertActions.error('Login failed'));
                });
        };
    },
    logout: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.logoutRequest());
            localStorage.removeItem('user');
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
