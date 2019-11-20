import React from 'react';
import PropTypes from 'prop-types';

const Suggestion = props => {
  const { val, onClick } = props;
  return (
    <h4 className="suggestion" onClick={onClick}>
      {val}
    </h4>
  );
};

Suggestion.propTypes = {
  val: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Suggestion;
