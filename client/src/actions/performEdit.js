import axios from 'axios';
import types from './AdminActionTypes';
import url from '../helpers/helperURL';

const editSuccess = response => {
  return dispatch => {
    dispatch({ payload: response, type: types.HANDLE_EDIT_RESPONSE });
  };
};

const performEdit = payload => {
  return dispatch => {
    return axios
      .post(`${url}/api/edit`, payload)
      .then(response => dispatch(editSuccess(response.data)));
  };
};

export default performEdit;
