import types from './AccountActionTypes';
import axios from 'axios';
import { url } from '../helpers/helperURL';
export function loginSuccess(response) {
    return (dispatch) => {
        dispatch({ payload: response, type: types.HANDLE_LOGIN_RESPONSE });
    };
}
const performLogin = (payload) => {
    return (dispatch) => {
        return axios
            .post(url + '/user/login', payload)
            .then((response) => dispatch(loginSuccess(response.data)));
    };
};

export default performLogin;