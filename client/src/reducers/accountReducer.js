import types from '../actions/AccountActionTypes';

const initialState = {
    signup_response: null,
    login_reponse: null
};

export default function AccountReducer(state = initialState, action) {
    switch (action.type) {
        case types.HANDLE_SIGNUP_RESPONSE:
            return {
                ...state,
                signup_response: action.payload,
            };

        case types.HANDLE_LOGIN_RESPONSE:
            return {
                ...state,
                login_response: action.payload,
            };
        default:
            return state;
    }
}