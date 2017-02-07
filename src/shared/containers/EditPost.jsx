import { connect } from 'react-redux';
import React from 'react';
import { submitEditPost } from '../actions/posts';
import { formUpdate } from '../actions/forms';
import EditPost from '../components/EditPost';
import { appraisePostMessage } from '../helpers/appraise';

function determineErrors(message, touched, exited) {
  const errors = {
    message: '',
    formReady: true,
  };

  const messageErrors = appraisePostMessage(message);
  if (messageErrors.length > 0 && exited.indexOf('message') > -1) {
    errors.message = messageErrors.join(' ');
  }
  if (messageErrors.length > 0) {
    errors.formReady = false;
  }
  return errors;
}

class EditPostContainer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  handleChange(fields) {
    this.props.dispatch(formUpdate(this.props.formName, fields));
  }
  handleSubmit() {
    this.props.dispatch(
      submitEditPost(this.props.message, this.props.postId, this.props.formName),
    );
  }
  handleFocus(fieldName) {
    if (this.props.fieldsTouched.indexOf(fieldName) === -1) {
      const newTouched = this.props.fieldsTouched.concat(fieldName);
      this.props.dispatch(formUpdate(this.props.formName, { fieldsTouched: newTouched }));
    }
  }
  handleBlur(fieldName) {
    if (this.props.fieldsExited.indexOf(fieldName) === -1) {
      const newExited = this.props.fieldsExited.concat(fieldName);
      this.props.dispatch(formUpdate(this.props.formName, { fieldsExited: newExited }));
    }
  }
  render() {
    const errors = determineErrors(
      this.props.message,
      this.props.fieldsTouched,
      this.props.fieldsExited,
    );
    if (this.props.submitError && this.props.submitError.length > 0) {
      errors.submitError = this.props.submitError;
    }
    return (
      <EditPost
        handleSubmit={() => this.handleSubmit()}
        handleChange={fields => this.handleChange(fields)}
        handleBlur={fieldName => this.handleBlur(fieldName)}
        handleFocus={fieldName => this.handleFocus(fieldName)}
        submitting={this.props.submitting}
        messageValue={this.props.message}
        errors={errors}
      />
    );
  }
}

EditPostContainer.propTypes = {
  formName: React.PropTypes.string.isRequired,
  postId: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  message: React.PropTypes.string,
  fieldsTouched: React.PropTypes.arrayOf(React.PropTypes.string),
  fieldsExited: React.PropTypes.arrayOf(React.PropTypes.string),
  submitError: React.PropTypes.string,
  submitting: React.PropTypes.bool,
};
EditPostContainer.defaultProps = {
  message: '',
  fieldsTouched: [],
  fieldsExited: [],
  submitError: '',
  submitting: false,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    message: state.forms[ownprops.formName].message,
    fieldsTouched: state.forms[ownprops.formName].fieldsTouched,
    fieldsExited: state.forms[ownprops.formName].fieldsExited,
    submitError: state.forms[ownprops.formName].submitError,
    submitting: state.forms[ownprops.formName].submitting,
  };
};

const Container = connect(mapStateToProps)(EditPostContainer);

export default Container;
