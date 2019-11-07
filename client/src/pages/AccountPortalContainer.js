import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

// import LoginSuccess from '../components/LoginSuccess';
import SideButtonPanel from '../components/SideButtonPanel';

// import actions here

class AccountPortalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleAddEdit = this.handleAddEdit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleAddEdit(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  handleFilter(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  render() {
    return (
      <div>
        <SideButtonPanel
          handleAddEdit={this.handleAddEdit}
          handleFilter={this.handleFilter}
        />
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
