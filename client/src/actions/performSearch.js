import axios from 'axios';
import types from './AdminActionTypes';
import url from '../helpers/helperURL';

const searchSuccess = response => {
  return dispatch => {
    dispatch({ payload: response, type: types.HANDLE_SEARCH_RESPONSE });
  };
};

const performSearch = payload => {
  return dispatch => {
    return axios.get(`${url}/api/search?q=${payload}`).then(response => {
      dispatch(searchSuccess(response.data));
    });
  };
};

export default performSearch;
