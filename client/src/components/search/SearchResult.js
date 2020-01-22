import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = props => {
  const { val } = props;
  return <div className="searchResult">{val}</div>;
};

SearchResult.propTypes = {
  val: PropTypes.string.isRequired,
};

export default SearchResult;
