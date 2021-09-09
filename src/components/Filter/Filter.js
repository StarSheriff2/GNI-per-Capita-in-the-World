import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const { otherCategory, changeCategoryFilter } = props;

  return (
    <div>
      <p>Filter Category: </p>
      <button type="button" onClick={changeCategoryFilter}>{otherCategory.toUpperCase()}</button>
    </div>
  );
};

Filter.propTypes = {
  changeCategoryFilter: PropTypes.func.isRequired,
};

export default Filter;
