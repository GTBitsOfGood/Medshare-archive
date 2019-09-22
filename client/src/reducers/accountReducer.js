import action_types from '../actions/actionTypes';

const initialState = {
    signup_response: null,
    login_reponse: null
};

export default function AccountReducer(state = initialState, action) {
    switch (action.type) {
        case action_types.HANDLE_SIGNUP_RESPONSE:
            return {
                ...state,
                signup_response: action.payload,
            };

        case action_types.HANDLE_LOGIN_RESPONSE:
            return {
                ...state,
                login_response: action.payload,
            };
        default:
            return state;
    }
}