import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const { val, onClickCross } = props;
  return <span className="filter">{val} <i onClick={onClickCross} className="fa fa-times"></i></span>;
};

Filter.propTypes = {
  val: PropTypes.string.isRequired,
  onClickCross: PropTypes.func.isRequired,
};

export default Filter;
