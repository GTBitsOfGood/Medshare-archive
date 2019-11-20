import { combineReducers } from 'redux';
import AccountReducer from '../reducers/accountReducer';
import AdminReducer from '../reducers/adminReducer';

export default combineReducers({
  AccountReducer,
  AdminReducer,
});
