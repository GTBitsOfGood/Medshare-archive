import types from './action_types';
export function signUpSuccess(response) {
    return (dispatch) => {
        dispatch({ payload: response, type: types.HANDLE_SIGNUP_RESPONSE });
    };
}
const performSignup = (payload) => {
    return (dispatch) => {
        return axiosInstance
            .post('/register', payload)
            .then((response) => dispatch(signUpSuccess(response.data)));
    };
};

export default performSignup;