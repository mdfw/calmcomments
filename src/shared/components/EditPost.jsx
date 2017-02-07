import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import TextareaAutosize from 'react-autosize-textarea';

/* SubmitProgress shows a spinner while we wait for account creation.
  */
class SubmitProgress extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    if (this.props.submitting) {
      return <CircularProgress mode="indeterminate" />;
    }
    return null;
  }
}
SubmitProgress.propTypes = {
  submitting: React.PropTypes.bool,
};
SubmitProgress.defaultProps = {
  submitting: false,
};

class EditPostForm extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = { fieldActive: false };
  }
  onChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.props.handleChange({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  onBlur(e) {
    const name = e.target.name;
    this.setState({ fieldActive: false });
    this.props.handleBlur(name);
  }
  onFocus(e) {
    const name = e.target.name;
    this.setState({ fieldActive: true });
    this.props.handleFocus(name);
  }
  render() {
    const {
      submitting,
      errors,
      messageValue,
    } = this.props;

    const createPostPaperStyle = {
      padding: '15px',
      marginBottom: '15px',
      borderColor: 'lightGray',
      borderWidth: '1px',
      borderRadius: '10px',
      borderStyle: 'solid',
    };

    const textAreaStyle = {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      width: '100%',
      borderColor: 'lightGrey',
      resize: 'none',
      outlineWidth: '1px',
      outlineColor: '#4798ad',
    };

    return (
      <div style={createPostPaperStyle}>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextareaAutosize
              maxRows={3}
              rows={2}
              disabled={submitting}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              name="message"
              value={messageValue}
              maxLength={5000}
              style={textAreaStyle}
              aria-label="Message content"
            />
          </div>
          <div>
            <FlatButton
              label="Update"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              disabled={submitting || !errors.formReady}
              type="submit"
            />
          </div>
        </form>
        <SubmitProgress submitting={submitting} />
      </div>
    );
  }
}

EditPostForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  messageValue: React.PropTypes.string,
};
EditPostForm.defaultProps = {
  submitting: false,
  errors: {},
  messageValue: '',
};

export default EditPostForm;
