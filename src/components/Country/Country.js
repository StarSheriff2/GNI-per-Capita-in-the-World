import React from 'react';
// import PropTypes from 'prop-types'

const Country = (props) => {
  const { country } = props;
  const { name, indicator, date } = country;

  return (
    <>
      <h2>{name}</h2>
      <p>{indicator}</p>
      <p>{date}</p>
    </>
  );
};

/* Country.propTypes = {

} */

export default Country;
