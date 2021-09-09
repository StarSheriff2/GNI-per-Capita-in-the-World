/* import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const IncomeGroupsList = (props) => {
  const { incomeGroups } = props;

  return (
    <>
      {incomeGroups.map((group) => (
        <Card key={group.id}>
          <h2>{group.name}</h2>
          <p>{group.indicator}</p>
        </Card>
      ))}
    </>
  );
};

IncomeGroupsList.propTypes = {
  incomeGroups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    indicator: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default IncomeGroupsList;
 */
