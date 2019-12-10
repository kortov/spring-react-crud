import * as authenticationActions from '@store/authentication/authentication.actions';

export interface AuthenticationState {
    loggingIn: boolean;
    loggedIn: boolean;
    user: any;
}

const initialState: AuthenticationState = {
    loggingIn: false,
    loggedIn: false,
    user: {},
};

export const authenticationReducer = (
    state = initialState,
    action: authenticationActions.Actions
): AuthenticationState => {
    switch (action.type) {
        case authenticationActions.LOGIN_REQUEST:
            return {
                ...state,
                loggedIn: true,
                user: action.payload,
            };
        case authenticationActions.LOGOUT_REQUEST:
            return {
                ...state,
                loggedIn: false,
                loggingIn: false,
                user: {},
            };
        default:
            return state;
    }
};
