import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

// import LoginSuccess from '../components/LoginSuccess';
import SideButtonPanel from '../components/SideButtonPanel';
import AdminSearchBar from '../components/AdminSearchBar';
import LabelEdit from '../components/LabelEdit';

// import actions here

class AccountPortalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editLabel: false,
    };
    this.handleAddEdit = this.handleAddEdit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAddEdit(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  handleFilter(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  handleChange(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  render() {
    const { editLabel } = this.state;
    return (
      <div>
        <SideButtonPanel
          handleAddEdit={this.handleAddEdit}
          handleFilter={this.handleFilter}
        />
        <AdminSearchBar handleInputChange={this.handleChange}/>
        <LabelEdit
          labelData={{
            name: 'Kitten',
            productReference: 'YEET',
            category: 'Cutie pies',
            subcategory: 'Cutie Queen',
            uom: 'Whole',
            description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
            edit: editLabel,
          }}
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
