import types from './AccountActionTypes';
import axios from 'axios';
export function loginSuccess(response) {
    return (dispatch) => {
        dispatch({ payload: response, type: types.HANDLE_LOGIN_RESPONSE });
    };
}
const performLogin = (payload) => {
    return (dispatch) => {
        return axios
            .post('/login', payload)
            .then((response) => dispatch(loginSuccess(response.data)));
    };
};

export default performLogin;