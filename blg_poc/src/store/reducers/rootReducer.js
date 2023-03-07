import { combineReducers } from 'redux';

import matters from './clientReducer';
//import tasks from './tasksReducer';
//import contracts from './contractsReducer';
import user from './userReducer';
//import documentTemplate from './documentTemplateReducer';
import global from './globalReducer';
//import config from './configReducer';
import clientContacts from "./clientContactReducer"
import currentAudit from "./currentAuditReducer"
import auditTasks from './auditTasksReducer';
import auditClient from './auditClientReducer';
import audits from "./auditReducer"
import currentTask from './currentTaskReducer';
import currentTaskDocuments from './currentTaskDocumentsReducer';
import currentTaskResponseData from './currentTaskResponseDataReducer';
import users from './usersReducer';

export default combineReducers({
  matters,
  //tasks,
  //contracts,
  user,
  users,
  //documentTemplate,
  global,
  clientContacts,
  currentAudit,
  auditTasks,
  auditClient,
  audits,
  currentTask,
  currentTaskDocuments,
  currentTaskResponseData
  //config,
});
