import * as alertActions from '@store/alerts/alerts.actions';
import {AlertItem} from '@models';

export interface AlertState {
    alert: AlertItem;
}

const initialState: AlertState = {
    alert: {type: '', message: undefined},
};

export const alertsReducer = (
    state = initialState,
    action: alertActions.Actions
): AlertState => {
    switch (action.type) {
        case alertActions.CLEAR:
            return {
                ...state,
                alert: {},
            };
        case alertActions.ERROR:
            return {
                ...state,
                alert: {
                    type: 'alert-danger',
                    message: action.payload,
                },
            };
        case alertActions.SUCCESS:
            return {
                ...state,
                alert: {
                    type: 'alert-success',
                    message: action.payload,
                },
            };
        default:
            return state;
    }
};
