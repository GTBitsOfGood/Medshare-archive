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
      displayTable: 'SignUp',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorType: '',
      errorMsg: '',
    };
    this.switch = this.switch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    if (e) e.preventDefault();

    const { username, password } = this.state;
    const { performLoginAction } = this.props;

    const user = {
      Name: username,
      Password: password,
    };

    if (!user.Name.replace(/\s/g, '').length) {
      this.setState({
        errorType: 'username',
        errorMsg: 'Empty Username!',
      });
    } else {
      performLoginAction(user)
        .then(() => {
          const { loginResponse } = this.props;
          if (loginResponse.error) {
            this.setState({
              errorType: loginResponse.errorType,
              errorMsg: loginResponse.errorMsg,
            });
          } else {
            localStorage.setItem('token', loginResponse.token);
            console.log('Login Success!');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleSubmit(e) {
    if (e) e.preventDefault();

    const { email, username, password, confirmPassword } = this.state;
    const { performSignupAction } = this.props;

    const user = {
      Email: email,
      Name: username,
      Password: password,
    };

    if (!validateEmail(user.Email)) {
      this.setState({
        errorType: 'email',
        errorMsg: 'Please enter valid email address!',
      });
    } else if (!user.Name.replace(/\s/g, '').length) {
      this.setState({
        errorType: 'username',
        errorMsg: 'Username empty!',
      });
    } else if (user.Password.replace(/\s/g, '').length < 6) {
      this.setState({
        errorType: 'password',
        errorMsg: 'Password is too short; minimum length is 6.',
      });
    } else if (user.Password !== confirmPassword) {
      this.setState({
        errorType: 'password',
        errorMsg: 'Password confirmation does not match password!',
      });
    } else {
      performSignupAction(user)
        .then(() => {
          const { signupResponse } = this.props;
          if (signupResponse.error) {
            this.setState({
              errorType: signupResponse.errorType,
              errorMsg: signupResponse.errorMsg,
            });
          } else {
            this.setState({
              displayTable: 'Login',
            });
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
    // console.log(`${name} changed: ${value}`);
  }

  switch(componentName) {
    this.setState({
      displayTable: componentName,
    });
  }

  render() {
    const { errorType, errorMsg, displayTable } = this.state;
    const components = {
      SignUp: (
        <Signup
          switchComponent={this.switch}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          validateEmail={validateEmail}
          errorType={errorType}
          errorMessage={errorMsg}
        />
      ),
      Login: (
        <Login
          switchComponent={this.switch}
          handleInputChange={this.handleInputChange}
          handleLogin={this.handleLogin}
          validateEmail={validateEmail}
          errorType={errorType}
          errorMessage={errorMsg}
        />
      ),
    };
    return <div>{components[displayTable]}</div>;
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
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginSignupContainer),
);
