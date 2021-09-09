import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { fetchDetails } from '../../redux/details/details';
// import styles from './GroupsList.module.scss';

const GroupsList = (props) => {
  const { groups, category, updatePath } = props;

  const dispatch = useDispatch();

  const groupCountries = useSelector((state) => state.details.entities, shallowEqual);

  const addGroupCountries = (groupId) => {
    dispatch(fetchDetails(groupId, category));
  };

  const isGroupCountry = (groupId) => groupId in groupCountries;

  const path = (str) => str
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('&', 'and');

  return (
    <>
      {groups
        .filter((group) => group.category === category)
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
                  current: category,
                  other: `${(category === 'region') ? 'income' : 'region'}`,
                },
              });
            }}
          >
            <Card bg={'Secondary'.toLowerCase()}>
              <h2>{group.name}</h2>
              <p>{group.indicator}</p>
            </Card>
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
  category: PropTypes.string.isRequired,
  updatePath: PropTypes.func.isRequired,
};

export default GroupsList;
