import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // Do nothing
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
