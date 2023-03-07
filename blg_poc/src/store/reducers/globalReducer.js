import { act } from 'react-dom/test-utils';
import {
  SET_GLOBAL_LOADER,
  ADD_POLL,
  REMOVE_POLL,
  ADD_ALERT,
  REMOVE_ALERT,
  ADD_ERROR,
  ADD_LOADER_ITEM,
  REMOVE_LOADER_ITEM
} from '../constants/global.consts';

const defaultBasetState = {
  globalLoader: false,
  pollList: [],
  alertsList: [],
  errors: [],
  globalLoaderItems: [],
  message: null
};

export default (state = defaultBasetState, action) => {
  switch (action.type) {
    case SET_GLOBAL_LOADER:
      return { ...state, globalLoader: action.payload };
    case 'SET_GLOBAL_MESSAGE' :
      return { ...state, message: action.payload}
    case ADD_POLL:
      return {
        ...state,
        pollList: Array.prototype.concat(state.pollList, action.payload),
      };
    case REMOVE_POLL:
      return {
        ...state,
        pollList: state.pollList
          .filter(f => f.id !== action.payload)
          .map(f => f),
      };
    case ADD_ALERT:
      return {
        ...state,
        alertsList: Array.prototype.concat(state.alertsList, action.payload),
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alertsList: state.alertsList
          .filter(f => f.id !== action.payload)
          .map(f => f),
      };
    case ADD_ERROR:
      return {
        ...state,
        // errors: state.errors.concat(action.payload),
      };
    case ADD_LOADER_ITEM:
      return {
        ...state,
        globalLoaderItems: [...state.globalLoaderItems, action.payload]
      }
    case REMOVE_LOADER_ITEM:
      return {
        ...state,
        globalLoaderItems: state.globalLoaderItems.filter(item => item !== action.payload)
      }
    default:
      return state;
  }
};
