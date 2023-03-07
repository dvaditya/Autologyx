import { SET_USER, SET_USER_GENERATED_DOCUMENT } from '../constants/user.consts';

const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  title: '',
  phone: '',
  csrfToken: '',
};

export default (state = defaultUser, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case SET_USER_GENERATED_DOCUMENT: 
      return { ...state, documentGenerated: action.payload }
    default:
      return state;
  }
};
