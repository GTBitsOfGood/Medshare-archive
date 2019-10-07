import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import LoginSuccess from '../components/LoginSuccess';

// import actions here

class AccountPortalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <LoginSuccess />
      </div>
    );
  }
}

AccountPortalContainer.defaultProps = {};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {};
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
  return {};
};

AccountPortalContainer.propTypes = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AccountPortalContainer),
);
