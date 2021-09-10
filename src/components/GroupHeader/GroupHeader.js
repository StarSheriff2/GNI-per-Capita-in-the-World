import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupHeader.module.scss';

const GroupHeader = (props) => {
  const { currentGroup } = props;

  const getGroupIcon = (groupName) => {
    if (groupName.includes('Europe')) {
      return (<i className={`fas fa-globe-europe ${styles.regionIcon}`} />);
    }
    if (groupName.includes('Asia')) {
      return (<i className={`fas fa-globe-asia ${styles.regionIcon}`} />);
    }
    if (groupName.includes('Africa')) {
      return (<i className={`fas fa-globe-africa ${styles.regionIcon}`} />);
    }
    if (groupName.includes('America')) {
      return (<i className={`fas fa-globe-americas ${styles.regionIcon}`} />);
    }
    if (groupName.includes('High income')) {
      return (
        <div className={`${styles.incomeLevelIconDiv}`}>
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        </div>
      );
    }
    if (groupName.includes('Low income')) {
      return (<div className={`${styles.incomeLevelIconDiv}`}><i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} /></div>);
    }
    if (groupName.includes('Lower middle income')) {
      return (
        <div className={`${styles.incomeLevelIconDiv}`}>
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        </div>
      );
    }
    return (
      <div className={`${styles.incomeLevelIconDiv}`}>
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
      </div>
    );
  };

  const icon = getGroupIcon(currentGroup);

  return (
    <>
      <div className={`${styles.filterContainer}`}>
        <div className={`d-flex ${styles.iconContainer}`}>
          {icon}
        </div>
        <div className={`${styles.filterController}`}>
          <h2 className={`${styles.currentCategory}`}>{currentGroup}</h2>
          <p className={`${styles.filterLabel}`}>Filter Category: </p>
        </div>
      </div>
      <p className={`${styles.indicatorDescription}`}>region breakdown</p>
    </>
  );
};

GroupHeader.propTypes = {
  currentCategory: PropTypes.string.isRequired,
};

export default GroupHeader;
