import React from 'react';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

/* LoginProgress shows a spinner while we wait for account creation.
  */
class LoginProgress extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    if (this.props.submitting) {
      return <CircularProgress mode="indeterminate" />;
    }
    return null;
  }
}
LoginProgress.propTypes = {
  submitting: React.PropTypes.bool,
};
LoginProgress.defaultProps = {
  submitting: false,
};

/* --- LoginError ---- */
const errorStyle = {
  color: '#c94f49',
  marginTop: '10px',
  marginBottom: '5px',
};

const LoginError = ({ errorMessage }) => {
  if (!errorMessage || errorMessage.length === 0) {
    return null;
  }
  return <div style={errorStyle}>{errorMessage}</div>;
};
LoginError.propTypes = {
  errorMessage: React.PropTypes.string,
};
LoginError.defaultProps = {
  errorMessage: '',
};

/* button style for the submit button below */
const submitButtonStyle = {
  margin: 12,
};

/* Main login form component */
class LoginForm extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setDemo = this.setDemo.bind(this);
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
    this.props.handleBlur(name);
  }
  onFocus(e) {
    const name = e.target.name;
    this.props.handleFocus(name);
  }
  setDemo(account, pass) {
    this.props.handleChange({
      email: account,
      password: pass,
    });
  }
  render() {
    const {
      loggingIn,
      errors,
      emailValue,
      passwordValue,
    } = this.props;

    let errorInfo = null;
    if (this.props.errors.loginError) {
      errorInfo = <LoginError errorMessage={this.props.errors.loginError} />;
    }
    const setDemo = this.setDemo;
    const useDemo1 = function useDemo1() {
      setDemo('hire@mdfw.me', 'Call-408-598-1325');
    };
    const useDemo2 = function useDemo2() {
      setDemo('contratar@mdfw.me', 'Call-408-598-1325');
    };
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="text-header">
            Login
          </div>
          <div>
            <Link to="/signup" className="loginHints">or Sign up</Link>
          </div>
          {errorInfo}
          <div className="login-form-demos">
            <h4>Demo accounts:</h4>
            <button onClick={useDemo1}>• hire@mdfw.me | <i>Call-408-598-1325</i> •</button><br />
            <button onClick={useDemo2}>• contratar@mdfw.me | <i>Call-408-598-1325</i> •</button>
          </div>
          <div>
            <TextField
              name="email"
              hintText="Email"
              floatingLabelText="Email"
              value={emailValue}
              errorText={errors.email}
              type="text"
              disabled={loggingIn}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <TextField
              name="password"
              hintText=""
              value={passwordValue}
              floatingLabelText="Password"
              disabled={loggingIn}
              type="password"
              errorText={errors.password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <RaisedButton
              label="Login"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              style={submitButtonStyle}
              disabled={loggingIn || !errors.formReady}
              type="submit"
            />
          </div>
          <div className="loginHints">
            Forgot password?
          </div>
        </form>
        <LoginProgress loggingIn={loggingIn} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  loggingIn: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  emailValue: React.PropTypes.string,
  passwordValue: React.PropTypes.string,
};

LoginForm.defaultProps = {
  inlineForm: false,
  loggingIn: false,
  emailValue: '',
  errors: {},
};

export default LoginForm;
