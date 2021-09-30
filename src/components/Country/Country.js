import React from 'react';
import PropTypes from 'prop-types';
import styles from './Country.module.scss';

const Country = (props) => {
  const { country } = props;
  const { name, value, date } = country;

  return (
    <div className={`${styles.countryContainer}`}>
      <h2>{name}</h2>
      <div className={`${styles.indicatorData}`}>
        {(value
        && (
        <>
          <p className={`${styles.indicatorValue}`}>{`$ ${Math.trunc(value).toLocaleString()}`}</p>
          <p className={`${styles.interPunct}`}>·&nbsp;</p>
          <p>{`(${date})`}</p>
        </>
        ))
        || (
        <p className={`${styles.indicatorValue}`}>No data</p>
        )}
      </div>
    </div>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
};

export default Country;
