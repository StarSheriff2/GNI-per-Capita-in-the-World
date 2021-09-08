import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDetails } from '../redux/details.js/details';

// import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types'

const Details = (props) => {
  const { group } = props;

  const dispatch = useDispatch();

  // const initialState = group;

  /* const location = useLocation();

  const [state, setState] = useState(group); */

  useEffect(() => {
    dispatch(fetchDetails(group));
  }, []);

  return (
    <div>
      {/* {console.log('location: ', location.pathname)} */}
      <h1>{group}</h1>
      Details Here!
    </div>
  );
};

/* Details.propTypes = {

} */

export default Details;
