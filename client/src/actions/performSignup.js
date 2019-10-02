import types from './AccountActionTypes';
import axios from 'axios';
import { url } from '../helpers/helperURL';
export function signUpSuccess(response) {
    return (dispatch) => {
        dispatch({ payload: response, type: types.HANDLE_SIGNUP_RESPONSE });
    };
}
const performSignup = (payload) => {
    console.log("perfroming signup");
    return (dispatch) => {
        return axios
            .post(url + '/user/register', payload)
            .then((response) => dispatch(signUpSuccess(response.data)));
    };
};

export default performSignup;