import * as registrationActions from '@store/registration/registration.actions';

export interface RegistrationState {
    registering: boolean;
}

const initialState: RegistrationState = {
    registering: false,
};

export const registrationReducer = (
    state = initialState,
    action: registrationActions.Actions
): RegistrationState => {
    switch (action.type) {
        case registrationActions.REGISTRATION_REQUEST:
            return {
                ...state,
                registering: true,
            };
        case registrationActions.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
            };
        case registrationActions.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
            };
        default:
            return state;
    }
};
