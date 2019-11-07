import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: block;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
`;

const Wrapper = styled.section`
  float: left;
  margin: 7px auto;
  border: none;
  border-radius: 5px;
  padding: 2px 5px;
`;

const SideButtonPanel = props => {
  const { handleAddEdit, handleFilter } = props;
  return (
    <Wrapper>
      <Button onClick={handleAddEdit}>Add/Edit</Button>
      <Button onClick={handleFilter}>Filter</Button>
    </Wrapper>
  );
};

SideButtonPanel.propTypes = {
  handleAddEdit: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default SideButtonPanel;
