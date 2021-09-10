import React from 'react';
import PropTypes from 'prop-types';
import styles from './Country.module.scss';

const Country = (props) => {
  const { country } = props;
  const { name, indicator, date } = country;

  return (
    <div className={`${styles.countryContainer}`}>
      <h2>{name}</h2>
      <div className={`${styles.indicatorData}`}>
        <p className={`${styles.indicatorValue}`}>{`$ ${Math.trunc(indicator).toLocaleString()}`}</p>
        <p className={`${styles.interPunct}`}>·&nbsp;</p>
        <p>{`(${date})`}</p>
      </div>
    </div>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    indicator: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Country;
