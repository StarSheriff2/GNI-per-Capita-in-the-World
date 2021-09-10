import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import LoadAnimation from '../components/LoadAnimation/LoadAnimation';
import Country from '../components/Country/Country';
import GroupHeader from '../components/GroupHeader/GroupHeader';
import styles from './Details.module.scss';

const Details = (props) => {
  const { currentPath, groupId } = props;

  const loadingStatus = useSelector((state) => state.details.status);
  const groupCountries = useSelector((state) => state.details.entities, shallowEqual);
  const countries = (groupId) ? groupCountries[groupId] : [];

  if (loadingStatus === 'starting') {
    return (
      <LoadAnimation />
    );
  }

  return (
    <section>
      <GroupHeader
        currentPath={currentPath}
        groupId={groupId}
      />
      <div className="details-container">
        {countries
          .sort((a, b) => a.indicator < b.indicator)
          .map((country) => (
            <li key={country.name} className={`${styles.countryWrapper}`}>
              <Country country={country} />
            </li>
          ))}
      </div>
    </section>
  );
};

Details.propTypes = {
  groupId: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Details;
