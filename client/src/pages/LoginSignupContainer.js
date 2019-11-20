import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Signup from '../components/Signup';
import Login from '../components/Login';

import performLogin from '../actions/performLogin';
import performSignup from '../actions/performSignup';

const validateEmail = email => {
  // eslint-disable-next-line max-len
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

class LoginSignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      accessCode: '',
      errorType: '',
      errorMsg: '',
      errorPosition: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    if (e) e.preventDefault();

    const { username, password } = this.state;
    const { performLoginAction, history } = this.props;

    const user = {
      Name: username,
      Password: password,
    };

    if (!user.Name.replace(/\s/g, '').length) {
      this.setState({
        errorType: 'username',
        errorMsg: 'Empty Username!',
        errorPosition: 0,
      });
    } else {
      performLoginAction(user)
        .then(() => {
          const { loginResponse } = this.props;
          if (loginResponse.error) {
            this.setState({
              errorType: loginResponse.errorType,
              errorMsg: loginResponse.errorMsg,
              errorPosition: 0,
            });
          } else {
            localStorage.setItem('token', loginResponse.token);
            console.log('Login Success!');
            history.push(`/account_portal`);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleSubmit(e) {
    if (e) e.preventDefault();

    const {
      email,
      username,
      password,
      confirmPassword,
      accessCode,
    } = this.state;
    const { performSignupAction, history } = this.props;

    const user = {
      Email: email,
      Name: username,
      Password: password,
    };

    if (accessCode !== 'This is Medshare!') {
      this.setState({
        errorType: 'accessCode',
        errorMsg: 'Access code incorrect!',
        errorPosition: 1,
      });
    } else if (!validateEmail(user.Email)) {
      this.setState({
        errorType: 'email',
        errorMsg: 'Please enter valid email address!',
        errorPosition: 1,
      });
    } else if (!user.Name.trim().length) {
      this.setState({
        errorType: 'username',
        errorMsg: 'Username empty!',
        errorPosition: 1,
      });
    } else if (user.Password.trim().length < 6) {
      this.setState({
        errorType: 'password',
        errorMsg: 'Password is too short; minimum length is 6.',
        errorPosition: 1,
      });
    } else if (user.Password !== confirmPassword) {
      this.setState({
        errorType: 'password',
        errorMsg: 'Password confirmation does not match password!',
        errorPosition: 1,
      });
    } else {
      performSignupAction(user)
        .then(() => {
          const { signupResponse } = this.props;
          if (signupResponse.error) {
            this.setState({
              errorType: signupResponse.errorType,
              errorMsg: signupResponse.errorMsg,
              errorPosition: 1,
            });
          } else {
            localStorage.setItem('token', signupResponse.token);
            history.push(`/account_portal`);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      errorType: undefined,
      errorMsg: '',
    });
  }

  render() {
    const { errorType, errorMsg, errorPosition } = this.state;
    return (
      <div>
        <Login
          switchComponent={this.switch}
          handleInputChange={this.handleInputChange}
          handleLogin={this.handleLogin}
          validateEmail={validateEmail}
          errorType={errorType}
          errorMessage={errorMsg}
          errorPosition={errorPosition}
        />
        <Signup
          switchComponent={this.switch}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          validateEmail={validateEmail}
          errorType={errorType}
          errorMessage={errorMsg}
          errorPosition={errorPosition}
        />
      </div>
    );
  }
}

LoginSignupContainer.defaultProps = {
  signupResponse: null,
  loginResponse: null,
};

const mapStateToProps = state => {
  return {
    signupResponse: state.AccountReducer.signupResponse,
    loginResponse: state.AccountReducer.loginResponse,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    performSignupAction: payload => dispatch(performSignup(payload)),
    performLoginAction: payload => dispatch(performLogin(payload)),
  };
};

LoginSignupContainer.propTypes = {
  performSignupAction: PropTypes.func.isRequired,
  performLoginAction: PropTypes.func.isRequired,
  signupResponse: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    errorType: PropTypes.string,
  }),
  loginResponse: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    errorType: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginSignupContainer),
);
