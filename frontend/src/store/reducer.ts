import {combineReducers, Reducer} from 'redux';
import {alertsReducer} from '@store/alerts';
import {RootState} from '@store/state.types';
import {authenticationReducer} from '@store/authentication';
import {registrationReducer} from '@store/registration';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    alert: alertsReducer,
    auth: authenticationReducer,
    registration: registrationReducer,
});
