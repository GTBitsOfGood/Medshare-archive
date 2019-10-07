import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineState from './combineReducer';

const configureReduxStore = () => {
  return createStore(
    combineState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
};
export default configureReduxStore;
