import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const RegionsList = (props) => {
  const { regions } = props;

  return (
    <>
      {regions.map((region) => (
        <Card key={region.id}>
          <h2>{region.name}</h2>
          <p>{region.indicator}</p>
        </Card>
      ))}
    </>
  );
};

RegionsList.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    indicator: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default RegionsList;
