/* Reducers for form actions.
 * Requires a form name to be passed in.
 */

import {
  FORM_UPDATE,
  FORM_CLEAR,
  REG_FORM_NAME,
  LOGIN_FORM_NAME,
  CREATE_POST_FORM_NAME,
  BEGIN_FORM,
} from '../actions/forms';

const DEFAULT_REGFORM = {
  displayName: '',
  email: '',
  password: '',
  fieldsTouched: [],
  fieldsExited: [],
};

const DEFAULT_LOGINFORM = {
  email: '',
  password: '',
  fieldsTouched: [],
  fieldsExited: [],
};

const DEFAULT_CREATE_POST_FORM = {
  message: '',
  messageId: null,
  fieldsTouched: [],
  fieldsExited: [],
  submitting: false,
  submitError: null,
};

const DEFAULT_FORM_STATE = {
  [REG_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_REGFORM)),
  [LOGIN_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_LOGINFORM)),
  [CREATE_POST_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_CREATE_POST_FORM)),
};

function emptyStateForForm(formId) {
  switch (formId) {
    case REG_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_REGFORM));
    case LOGIN_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_LOGINFORM));
    case CREATE_POST_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_CREATE_POST_FORM));
    default:
      return {};
  }
}

function formUpdate(newstate, action) {
  const nextstate = newstate;
  const formId = action.formId;
  const oldFields = newstate[formId];
  const regKeys = Object.keys(action.fields);
  regKeys.forEach((key) => {
    oldFields[key] = action.fields[key];
  });
  nextstate[formId] = oldFields;
  return nextstate;
}


const formReducer = function regFormReducer(state = DEFAULT_FORM_STATE, action) {
  const newstate = Object.assign({}, state);
  switch (action.type) {
    case FORM_UPDATE: {
      return formUpdate(newstate, action);
    }
    case BEGIN_FORM: {
      newstate[action.formId] = action.fields;
      return newstate;
    }
    case FORM_CLEAR: {
      const formId = action.formId;
      const emptyState = emptyStateForForm(formId);
      newstate[formId] = emptyState;
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default formReducer;
