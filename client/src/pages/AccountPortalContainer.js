import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// import LoginSuccess from '../components/LoginSuccess';
import SideButtonPanel from '../components/SideButtonPanel';
import AdminSearchBar from '../components/AdminSearchBar';
import LabelEdit from '../components/LabelEdit';
import AdminItemList from '../components/AdminItemList';

import performAdd from '../actions/performAdd';
import performEdit from '../actions/performEdit';
import performSearch from '../actions/performSearch';

const isEmpty = obj => {
  return !obj || Object.keys(obj).length === 0;
};

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
      errorType: '',
      errorMssg: '',
      searchResults: {},
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
    const { searchInput } = this.state;

    const { performSearchAction } = this.props;

    if (searchInput.length < 1) {
      this.setState({
        errorType: 'searchInput',
        errorMsg: 'Empty Search Input!',
      });
    } else {
      performSearchAction(searchInput)
        .then(() => {
          const { searchResponse } = this.props;
          if (isEmpty(searchResponse)) {
            this.setState({
              errorType: 'searchInput',
              errorMsg: 'Search Response Empty!',
            });
          } else {
            this.setState({
              searchResults: searchResponse,
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  displayLabel(d) {
    this.setState({
      editButton: true,
      displayResult: false,
      editLabel: false,
      labelData: d,
    });
  }

  render() {
    const {
      editLabel,
      editButton,
      displayResult,
      labelData,
      searchResults,
    } = this.state;
    /*const testData = [
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
    ];*/
    return (
      <div>
        <SideButtonPanel
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleFilter={this.handleFilter}
          isEdit={editButton}
        />
        <AdminSearchBar
          handleInputChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        {!displayResult ? (
          <LabelEdit
            labelData={labelData}
            edit={editLabel}
            handleEditFinish={this.handleEditFinish}
          />
        ) : null}
        {displayResult ? (
          <AdminItemList
            data={searchResults}
            displayLabel={this.displayLabel}
          />
        ) : null}
      </div>
    );
  }
}

AccountPortalContainer.defaultProps = {};

const mapStateToProps = state => {
  return {
    searchResponse: state.AdminReducer.searchResponse,
    addResponse: state.AdminReducer.addResponse,
    editResponse: state.AdminReducer.editResponse,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    performSearchAction: payload => dispatch(performSearch(payload)),
    performAddAction: payload => dispatch(performAdd(payload)),
    performEditAction: payload => dispatch(performEdit(payload)),
  };
};

AccountPortalContainer.propTypes = {
  performSearchAction: PropTypes.func.isRequired,
  performAddAction: PropTypes.func.isRequired,
  performEditAction: PropTypes.func.isRequired,
  searchResponse: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    errorType: PropTypes.string,
  }),
  addResponse: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    errorType: PropTypes.string,
  }),
  editResponse: PropTypes.shape({
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
  )(AccountPortalContainer),
);
