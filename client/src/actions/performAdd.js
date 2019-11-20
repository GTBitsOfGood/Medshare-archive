import axios from 'axios';
import types from './AdminActionTypes';
import url from '../helpers/helperURL';

const addSuccess = response => {
  return dispatch => {
    dispatch({ payload: response, type: types.HANDLE_ADD_RESPONSE });
  };
};

const performAdd = payload => {
  return dispatch => {
    return axios
      .post(`${url}/api/add`, payload)
      .then(response => dispatch(addSuccess(response.data)));
  };
};

export default performAdd;
