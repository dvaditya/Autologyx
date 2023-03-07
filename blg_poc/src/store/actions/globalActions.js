import { v4 as uuidv4 } from 'uuid';
import {
  ADD_POLL,
  REMOVE_POLL,
  ADD_ALERT,
  REMOVE_ALERT,
  ADD_ERROR,
  SET_GLOBAL_LOADER,
  ADD_LOADER_ITEM,
  REMOVE_LOADER_ITEM
} from '../constants/global.consts';

export const setGlobalLoader = show => async dispatch => {
  dispatch({
    type: SET_GLOBAL_LOADER,
    payload: show,
  });
};

export const setGlobalMessage = message => async dispatch => {
  dispatch({
    type: 'SET_GLOBAL_MESSAGE',
    payload: message
  })
}

export const addGlobalLoaderItem = (item) => {
  return {
    type: ADD_LOADER_ITEM,
    payload: item
  }
}

export const removeGlobalLoaderItem = (item) => {
  return {
    type: REMOVE_LOADER_ITEM,
    payload: item
  }
}


export const addPoll = data => async dispatch => {
  dispatch({
    type: ADD_POLL,
    payload: { ...data, id: uuidv4(), created_at: new Date() },
  });
};

export const removePoll = id => async dispatch => {
  dispatch({
    type: REMOVE_POLL,
    payload: id,
  });
};

export const addAlert = data => {
  console.log("data", data)
  return {
    type: ADD_ALERT,
    payload: { ...data, id: uuidv4(), created_at: new Date() },
  };
};

export const removeAlert = id => async dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};

export const addError = error => async dispatch => {
  dispatch({
    type: ADD_ERROR,
    payload: error,
  });
};
