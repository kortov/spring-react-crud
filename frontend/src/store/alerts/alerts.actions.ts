import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '@store/actions-helpers';

export const CLEAR = '[APP] CLEAR';
export const ERROR = '[APP] ERROR';
export const SUCCESS = '[APP] SUCCESS';

export const Actions = {
    clearAlerts: () => createAction(CLEAR),
    success: (message: string) => createAction(SUCCESS, message),
    error: (message: string) => createAction(ERROR, message),
};

export const Thunks = {
    clearAlerts: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.clearAlerts());
        };
    },
    success: (message: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.success(message));
        };
    },
    error: (message: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.error(message));
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
