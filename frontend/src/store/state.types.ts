import {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import {AlertState} from '@store/alerts';
import {AuthenticationState} from '@store/authentication';
import {RegistrationState} from '@store/registration';

export interface RootState {
    alert: AlertState;
    auth: AuthenticationState;
    registration: RegistrationState;
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
