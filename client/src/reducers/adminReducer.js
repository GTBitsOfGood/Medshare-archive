import types from '../actions/AdminActionTypes';

const initialState = {
  searchResponse: null,
  addReponse: null,
  editReponse: null,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_ADD_RESPONSE:
      return {
        ...state,
        addResponse: action.payload,
      };

    case types.HANDLE_EDIT_RESPONSE:
      return {
        ...state,
        editResponse: action.payload,
      };

    case types.HANDLE_SEARCH_RESPONSE:
      return {
        ...state,
        searchResponse: action.payload,
      };
    default:
      return state;
  }
};

export default AdminReducer;
