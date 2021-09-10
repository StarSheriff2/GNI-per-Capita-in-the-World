import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

const Filter = (props) => {
  const { currentCategory, otherCategory, changeCategoryFilter } = props;

  return (
    <div className={`${styles.filterContainer}`}>
      <div className={`d-flex ${styles.iconContainer}`}>
        <i className={`fas fa-globe ${styles.worldIcon}`} />
      </div>
      <div className={`${styles.filterController}`}>
        <p className={`${styles.currentCategory}`}>{(currentCategory === 'region') ? 'REGIONS' : 'INCOME LEVELS'}</p>
        <p className={`${styles.filterLabel}`}>Filter Category: </p>
        <button
          className={`${styles.filterButton}`}
          type="button"
          onClick={changeCategoryFilter}
        >
          {otherCategory.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  changeCategoryFilter: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  otherCategory: PropTypes.string.isRequired,
};

export default Filter;
