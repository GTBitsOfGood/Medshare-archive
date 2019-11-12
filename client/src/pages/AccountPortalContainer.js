import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

// import LoginSuccess from '../components/LoginSuccess';
import SideButtonPanel from '../components/SideButtonPanel';
import AdminSearchBar from '../components/AdminSearchBar';
import LabelEdit from '../components/LabelEdit';
import AdminItemList from '../components/AdminItemList';

// import actions here

class AccountPortalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editLabel: false,
      editButton: false,
      searchInput: '',
      displayResult: true,
      labelData: {
        ProductName: 'Kitten',
        ProductRef: 'YEET',
        CategoryName: 'Cutie pies',
        SubCategory: 'Cutie Queen',
        UnitMeasureName: 'Whole',
        description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
      },
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEditFinish = this.handleEditFinish.bind(this);
    this.displayLabel = this.displayLabel.bind(this);
  }

  handleAdd(e) {
    if (e) e.preventDefault();
    this.setState({
      editButton: false,
      displayResult: false,
      labelData: {
        ProductName: 'Enter Name Here',
        ProductRef: 'Enter Reference Here',
        CategoryName: 'Enter Category Name Here',
        SubCategory: 'Enter SubCategory Name Here',
        UnitMeasureName: 'Enter Unit of Measure Here',
        description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
      },
      editLabel: true,
    });
  }

  handleEdit(e) {
    if (e) e.preventDefault();
    this.setState({ editLabel: true });
  }

  handleEditFinish(e) {
    if (e) e.preventDefault();
    this.setState({
      editButton: false,
      displayResult: true,
    });
  }

  handleFilter(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({
      searchInput: value,
    });
  }

  handleSearch(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  displayLabel(d) {
    this.setState({
      editButton: true,
      displayResult: false,
      editLabel: false,
      labelData: {
        ProductName: 'Kitten',
        ProductRef: 'YEET',
        CategoryName: 'Cutie pies',
        SubCategory: 'Cutie Queen',
        UnitMeasureName: 'Whole',
        description: `Lorem ipsum dolor sit amet consectetur 
adipisicing elit. Ullam ut molestiae neque maxime 
praesentium fuga culpa, eos dolore? Aperiam fugit 
ducimus ipsa tempora enim, porro ab molestiae id ea 
repudiandae.`,
      },
    });
  }

  render() {
    const { editLabel, editButton, displayResult, labelData } = this.state;
    const testData = [
      {
        _id: '5d7e9aec5bf584261d37c0ca',
        ProductID: '417',
        ProductRef: '700417',
        ProductName: 'SYRINGES, IRRIGATION PISTON SYRINGE,60CC',
        ProductCatID: '7',
        StorageID: '**NONE**',
        ClassID: '',
        UnitMeasureName: 'BOX',
        CategoryName: 'World Vision',
        SubCategory: 'Syringes',
      },
      {
        _id: '5d7e9aec5bf584261d37c1b4',
        ProductID: '5008',
        ProductRef: '705008',
        ProductName: 'Infusion Pumps, Syringe, Syringe Infusion Pump',
        ProductCatID: '5',
        StorageID: '**NONE**',
        ClassID: '',
        UnitMeasureName: 'BOX',
        CategoryName: 'Bio Med',
        SubCategory: 'Feeding',
      },
    ];
    return (
      <div>
        <SideButtonPanel
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleFilter={this.handleFilter}
          isEdit={editButton}
        />
        <AdminSearchBar handleInputChange={this.handleChange} />
        {!displayResult ? (
          <LabelEdit
            labelData={labelData}
            edit={editLabel}
            handleEditFinish={this.handleEditFinish}
          />
        ) : null}
        {displayResult ? (
          <AdminItemList data={testData} displayLabel={this.displayLabel} />
        ) : null}
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
