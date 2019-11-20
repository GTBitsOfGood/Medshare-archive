import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  display: block;
  margin: 21px auto;
  width: 60%;
  background-color: #bdd8f2;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 2px 5px;
  text-decoration: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px #0066ff;
  }
`;

const SubmitInput = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`;

const AdminSearchBar = props => {
  const { handleInputChange, handleSearch } = props;
  return (
    <div>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search For Product"
          name="searchInput"
          onChange={handleInputChange}
        />
        <SubmitInput type="submit" tabIndex="-1" />
      </form>
    </div>
  );
};

AdminSearchBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default AdminSearchBar;
