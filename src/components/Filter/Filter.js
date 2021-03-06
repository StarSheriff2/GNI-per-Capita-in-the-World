import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

const Filter = (props) => {
  const { currentCategory, otherCategory, updatePath } = props;

  let icon = (<i className={`fas fa-globe ${styles.worldIcon}`} />);

  if (currentCategory !== 'region') {
    icon = (<i className={`fas fa-dollar-sign ${styles.worldIcon}`} />);
  }

  return (
    <>
      <div className={`${styles.filterContainer}`}>
        <div className={`d-flex ${styles.iconContainer}`}>
          {icon}
        </div>
        <div className={`${styles.filterController}`}>
          <h2 className={`${styles.currentCategory}`} data-testid="currentCategory">{(currentCategory === 'region') ? 'REGIONS' : 'INCOME LEVELS'}</h2>
          <p className={`${styles.filterLabel}`}>Filter Category: </p>
          <button
            className={`${styles.filterButton}`}
            type="button"
            onClick={() => {
              updatePath({
                currentCategory: {
                  current: otherCategory,
                  other: currentCategory,
                },
              });
            }}
          >
            {otherCategory.toUpperCase()}
          </button>
        </div>
      </div>
      <p className={`${styles.indicatorDescription}`}>
        {`${(currentCategory === 'region') ? 'indicators by country region' : 'indicators by country income-level'}`}
      </p>
    </>
  );
};

Filter.propTypes = {
  updatePath: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  otherCategory: PropTypes.string.isRequired,
};

export default Filter;
