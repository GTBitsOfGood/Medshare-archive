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
  const {
    handleAdd,
    handleEdit,
    handleFilter,
    isEdit,
    isLabel,
    handleBack,
  } = props;
  return (
    <Wrapper>
      {isEdit ? (
        <Button onClick={handleEdit}>Edit</Button>
      ) : (
        <Button onClick={handleAdd}>Add</Button>
      )}
      {isLabel ? (
        <Button onClick={handleBack}>Back</Button>
      ) : (
        null
      )}
      {/*<Button onClick={handleFilter}>Filter</Button>*/}
    </Wrapper>
  );
};

SideButtonPanel.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isLabel: PropTypes.bool.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default SideButtonPanel;
