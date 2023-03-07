import { SET_USER, SET_USER_GENERATED_DOCUMENT } from '../constants/user.consts';

export const setUser = userData => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: userData,
  });
};

export const setUserGeneratedDocument = documentGenerated => async dispatch => {
  dispatch({
    type: SET_USER_GENERATED_DOCUMENT,
    payload: documentGenerated,
  });
};
