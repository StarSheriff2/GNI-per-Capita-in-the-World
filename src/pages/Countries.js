// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchGniWorld } from '../redux/gniWorld/gniWorld';
import { fetchCountries } from '../redux/countries/countries';
import LoadAnimation from '../components/LoadAnimation/LoadAnimation';
import Country from '../components/Country/Country';
import GroupHeader from '../components/GroupHeader/GroupHeader';
import styles from './Countries.module.scss';
import incomeLevelCodes from '../filters/incomeLevel';

const Countries = (props) => {
  const { currentPath, groupId } = props;
  const { currentCategory, path } = currentPath;

  const dispatch = useDispatch();

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const groupCountries = useSelector((state) => state.countries.entities, shallowEqual);
  const gniWorldLoadingStatus = useSelector((state) => state.gniWorld.status);
  const countriesLoadingStatus = useSelector((state) => state.countries.status);

  let currentCountries = { fetched: false };

  const validateGroupId = () => {
    if (currentCategory.current === 'region') {
      return groupId;
    }
    return incomeLevelCodes[groupId];
  };

  if (validateGroupId() in groupCountries) {
    const id = validateGroupId();

    currentCountries = {
      fetched: true,
      countries: groupCountries[id].map((country) => {
        let indicator = { value: null, date: null };

        for (let i = 0; i < gniWorld.length; i += 1) {
          if (gniWorld[i].countryiso3code === country.id) {
            indicator = { value: gniWorld[i].value, date: gniWorld[i].date };
            break;
          }
        }

        return ({
          ...country,
          ...indicator,
        });
      }),
    };
  }

  useEffect(() => {
    if (gniWorld.length === 0) {
      dispatch(fetchGniWorld());
    }
    if (gniWorld.length > 0 && !(validateGroupId() in groupCountries)) {
      dispatch(fetchCountries(groupId, currentCategory.current));
    }
  }, [gniWorld]);

  if (gniWorldLoadingStatus === 'starting' || countriesLoadingStatus === 'starting') {
    return (
      <section className={`${styles.spinnerContainer}`}>
        <LoadAnimation />
      </section>
    );
  }

  return (
    <section>
      <GroupHeader
        currentPath={path}
        groupId={groupId}
      />
      <div className="details-container">
        {currentCountries.fetched && currentCountries.countries
          .sort((a, b) => a.value < b.value)
          .map((country) => (
            <li key={country.id} className={`${styles.countryWrapper}`}>
              <Country country={country} />
            </li>
          ))}
      </div>
    </section>
  );
};

/* Details.propTypes = {
  groupId: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
}; */

export default Countries;
