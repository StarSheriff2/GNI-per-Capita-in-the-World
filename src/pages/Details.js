import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Country from '../components/Country/Country';

const Details = (props) => {
  const { groupId } = props;

  const loadingStatus = useSelector((state) => state.details.status);
  const groupCountries = useSelector((state) => state.details.entities, shallowEqual);
  const countries = (groupId) ? groupCountries[groupId] : [];

  if (loadingStatus === 'starting') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="details-container">
      {countries.map((country) => (
        <li key={country.name}>
          <Country country={country} />
        </li>
      ))}
    </div>
  );
};

Details.propTypes = {
  groupId: PropTypes.string.isRequired,
};

export default Details;
