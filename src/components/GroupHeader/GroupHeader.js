import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './GroupHeader.module.scss';

const GroupHeader = (props) => {
  const { currentPath, groupId } = props;

  const groups = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const currentGroup = groups.filter((group) => (
    ((group.countryiso3code.length === 0) ? group.country.id : group.countryiso3code) === groupId
  ));

  const extractGroupName = currentPath
    .replace(/groups\//, '')
    .replace(/\//g, '')
    .replace(/-/g, ' ')
    .replace(/and/g, '&');

  const getGroupIcon = (groupName) => {
    if (groupName.includes('europe')) {
      return (<i className={`fas fa-globe-europe ${styles.regionIcon}`} />);
    }
    if (groupName.includes('asia')) {
      return (<i className={`fas fa-globe-asia ${styles.regionIcon}`} />);
    }
    if (groupName.includes('africa')) {
      return (<i className={`fas fa-globe-africa ${styles.regionIcon}`} />);
    }
    if (groupName.includes('america')) {
      return (<i className={`fas fa-globe-americas ${styles.regionIcon}`} />);
    }
    if (groupName.includes('high income')) {
      return (
        <div className={`${styles.incomeLevelIconDiv}`}>
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        </div>
      );
    }
    if (groupName.includes('low income')) {
      return (<div className={`${styles.incomeLevelIconDiv}`}><i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} /></div>);
    }
    if (groupName.includes('lower middle income')) {
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

  const icon = getGroupIcon(extractGroupName);

  return (
    <>
      <div className={`${styles.filterContainer}`}>
        <div className={`d-flex ${styles.iconContainer}`}>
          {icon}
        </div>
        <div className={`${styles.filterController}`}>
          <h2 className={`${styles.currentGroup}`}>{extractGroupName}</h2>
          <p className={`${styles.groupIndicator}`}>
            {`$ ${(currentGroup.length !== 0) ? Math.trunc(currentGroup[0].value).toLocaleString() : 0}`}
          </p>
        </div>
      </div>
      <p className={`${styles.indicatorDescription}`}>country breakdown</p>
    </>
  );
};

GroupHeader.propTypes = {
  currentPath: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default GroupHeader;
