import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
// import styles from './GroupsList.module.scss';

const GroupsList = (props) => {
  const { groups, category } = props;

  return (
    <>
      {groups
        .filter((group) => group.category === category)
        .map((group) => (
          <Card key={group.id} bg={'Primary'.toLowerCase()}>
            <h2>{group.name}</h2>
            <p>{group.indicator}</p>
          </Card>
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
