import types from '../actions/AccountActionTypes';

const initialState = {
  signupResponse: null,
  loginReponse: null,
};

export default function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case types.HANDLE_SIGNUP_RESPONSE:
      return {
        ...state,
        signupResponse: action.payload,
      };

    case types.HANDLE_LOGIN_RESPONSE:
      return {
        ...state,
        loginResponse: action.payload,
      };
    default:
      return state;
  }
}
