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
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleAdd(e) {
    if (e) e.preventDefault();
    this.setState();
  }

  handleEdit(e) {
    if (e) e.preventDefault();
    this.setState();
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

  render() {
    const { editLabel, editButton, displayResult } = this.state;
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
        {editButton ? (
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
        ) : null}
        {displayResult ? <AdminItemList data={testData} /> : null}
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
