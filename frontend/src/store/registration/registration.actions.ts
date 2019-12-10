import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {User} from '@models';
import {Actions as alertActions} from '@store/alerts';
import {Thunks as authenticationThunks} from '@store/authentication';
import {history} from '@store';
import axios from 'axios';

export const REGISTRATION_REQUEST = '[REGISTRATION] REGISTER_REQUEST';
export const REGISTER_SUCCESS = '[REGISTRATION] USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = '[REGISTRATION] USERS_REGISTER_FAILURE';

const hostname = window.location.hostname;

export const Actions = {
    registrationRequest: (user: User) => createAction(REGISTRATION_REQUEST, user),
    registrationSuccess: () => createAction(REGISTER_SUCCESS),
    registrationFailure: () => createAction(REGISTER_FAILURE),
};

export const Thunks = {
        register: (user: User) => {
            return (dispatch: Dispatch) => {
                dispatch(Actions.registrationRequest(user));
                const promise = axios.post('http://' + hostname + ':8080/api/auth/signup', user);
                promise.then(
                    response => {
                        dispatch(Actions.registrationSuccess());
                        history.push('/login');
                        const {data} = response;
                        dispatch(alertActions.success(data.message));
                        history.push('/');
                    },
                    error => {
                        dispatch(Actions.registrationFailure());
                        const description: string = error.message || 'Sorry! Something went wrong. Please try again!';
                        dispatch(alertActions.error(description));
                        authenticationThunks.logout();
                        location.reload();
                    }
                );
                dispatch(alertActions.clearAlerts());
            };
        },

        handleResponse: (response: any) => {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        authenticationThunks.logout();
                        location.reload();
                    }
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return data;
            });
        },
    }
;

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
