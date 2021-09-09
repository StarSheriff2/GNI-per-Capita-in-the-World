import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchDetails } from '../redux/details/details';
import Country from '../components/Country/Country';

const Details = (props) => {
  const { groupId } = props;

  // const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.details.status);
  const groupCountries = useSelector((state) => state.details.entities, shallowEqual);
  const countries = groupCountries[groupId];


  /* useEffect(() => {
    if (!(groupId in groups)) {
      dispatch(fetchDetails(groupId));
    }
  }, []); */

  if (loadingStatus === 'starting') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // console.log('countriesDetails: ', groupCountries[groupId]);

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

};

/* GroupsList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    indicator: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  category: PropTypes.string.isRequired,
}; */

export default Details;
