// import PropTypes from 'prop-types';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { fetchDetails } from '../../redux/details/details';
import styles from './GroupsList.module.scss';

const GroupsList = ({ groups, category, updatePath }) => {
  const { current, other } = category;

  const path = (str) => str
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('&', 'and');

  const groupIcon = (groupName) => {
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

  return (
    <>
      {groups.entities
        .sort((a, b) => a.value < b.value)
        .map((group) => (
          <NavLink
            className={`${styles.groupContainer}`}
            key={group.country.id}
            to={`/groups/${path(group.country.value)}/`}
            activeClassName="active-group"
            onClick={() => {
              const groupId = (current === 'region') ? group.countryiso3code : group.country.id;
              updatePath({
                path: `/groups/${path(group.country.value)}/`,
                groupId,
                currentCategory: {
                  current,
                  other,
                },
              });
            }}
          >
            <div className={`${styles.groupDivContainer}`}>
              {groupIcon(group.country.value)}
              <i className={`far fa-arrow-alt-circle-right ${styles.arrowIcon}`} />
              <div>
                <h3 className={`${styles.groupName}`}>{group.country.value}</h3>
                <p>{`$ ${Math.trunc(group.value).toLocaleString()}`}</p>
              </div>
            </div>
          </NavLink>
        ))}
    </>
  );
};

/* GroupsList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    indicator: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  category: PropTypes.shape({
    current: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
  }).isRequired,
  updatePath: PropTypes.func.isRequired,
}; */

export default GroupsList;
