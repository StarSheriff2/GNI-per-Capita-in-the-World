import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchDetails } from '../redux/details/details';
import Country from '../components/Country/Country';

const Details = (props) => {
  const { groupId } = props;

  // const [state, setState] = useState(null);

  const dispatch = useDispatch();

  const countries = useSelector((state) => state.details.entities, shallowEqual);
  const loadingStatus = useSelector((state) => state.details.status);

  const [id, setId] = useState(groupId);

  // const [groupDetails, setGroupDetails] = useState(countries);

  useEffect(() => {
    // if (state !== groupId) {
    // setState(() => groupId);
    console.log('hi');
    // }
    // console.log('state is differente?', state !== groupId);
    if (countries.length === 0) {
      dispatch(fetchDetails(groupId));
    }
  }, []);

  /* useEffect(() => {
    dispatch(fetchDetails(groupId));
  }, [countries]); */

  if (loadingStatus === 'starting') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log('state: ', id);
  console.log('groupId: ', groupId);
  // setId('whatevs');

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
