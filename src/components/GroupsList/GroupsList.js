import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchDetails } from '../../redux/details/details';
import styles from './GroupsList.module.scss';

const GroupsList = (props) => {
  const { groups, category, updatePath } = props;
  const { current, other } = category;

  const dispatch = useDispatch();

  const groupCountries = useSelector((state) => state.details.entities, shallowEqual);

  const addGroupCountries = (groupId) => {
    dispatch(fetchDetails(groupId, current));
  };

  const isGroupCountry = (groupId) => groupId in groupCountries;

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
        <>
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        </>
      );
    }
    if (groupName.includes('Low income')) {
      return (<i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />);
    }
    if (groupName.includes('Lower middle income')) {
      return (
        <>
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
          <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        </>
      );
    }
    return (
      <>
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
        <i className={`fas fa-dollar-sign ${styles.incomeLevelIcon}`} />
      </>
    );
  };

  return (
    <>
      {groups
        .filter((group) => group.category === current)
        .map((group) => (
          <NavLink
            key={group.id}
            to={`/groups/${path(group.name)}/`}
            activeClassName="active-group"
            onClick={() => {
              if (!isGroupCountry(group.id)) addGroupCountries(group.id);
              updatePath({
                path: path(`/groups/${path(group.name)}/`),
                groupId: group.id,
                currentCategory: {
                  current,
                  other,
                },
              });
            }}
          >
            <div>
              {groupIcon(group.name)}
              <h2>{group.name}</h2>
              <p>{group.indicator}</p>
            </div>
          </NavLink>
        ))}
    </>
  );
};

GroupsList.propTypes = {
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
};

export default GroupsList;
