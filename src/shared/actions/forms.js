const REG_FORM_NAME = 'registerForm';
const LOGIN_FORM_NAME = 'loginForm';
const CREATE_POST_FORM_NAME = 'createPostForm';

/* Clears the associated form values from 'formId' */
const FORM_CLEAR = 'FORM_CLEAR';
function formClear(formId) {
  return {
    type: FORM_CLEAR,
    formId: formId,
  };
}

const BEGIN_FORM = 'BEGIN_FORM';
function beginForm(formId, fields) {
  return {
    type: BEGIN_FORM,
    fields: fields,
    formId: formId,
  };
}

/* Updates the specified fields in 'formId' */
const FORM_UPDATE = 'FORM_UPDATE';
function formUpdate(formId, fields) {
  const newFields = {};
  const keys = Object.keys(fields);
  keys.forEach((key) => {
    newFields[key] = fields[key];
  });
  return {
    type: FORM_UPDATE,
    fields: newFields,
    formId: formId,
  };
}

export {
  REG_FORM_NAME,
  LOGIN_FORM_NAME,
  CREATE_POST_FORM_NAME,
  BEGIN_FORM,
  beginForm,
  FORM_UPDATE,
  formUpdate,
  FORM_CLEAR,
  formClear,
};
