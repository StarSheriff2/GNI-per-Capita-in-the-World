import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
// import styles from './GroupsList.module.scss';

const GroupsList = (props) => {
  const { groups, category, updatePath } = props;

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
            onClick={() => updatePath({
              path: path(`/groups/${path(group.name)}/`),
              groupId: group.id,
            })}
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
};

export default GroupsList;
