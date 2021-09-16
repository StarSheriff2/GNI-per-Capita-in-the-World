// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchGniWorld } from '../redux/gniWorld/gniWorld';
import { fetchCountries } from '../redux/countries/countries';
import LoadAnimation from '../components/LoadAnimation/LoadAnimation';
import Country from '../components/Country/Country';
// import GroupHeader from '../components/GroupHeader/GroupHeader';
import styles from './Countries.module.scss';

const Countries = (props) => {
  const { currentPath, groupId } = props;

  const dispatch = useDispatch();

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const groupCountries = useSelector((state) => state.countries.entities, shallowEqual);
  const gniWorldLoadingStatus = useSelector((state) => state.gniWorld.status);
  const countriesLoadingStatus = useSelector((state) => state.countries.status);
  // const [countries, setCountries] = useState({ mounted: false })

  let currentCountries = { fetched: false }

  if (groupId in groupCountries) {
    currentCountries = {
      fetched: true,
      countries: groupCountries[groupId].map((country) => {
        let indicator = { value: null, date: null };

        for (let i = 0; i < gniWorld.length; i+= 1) {
          if (gniWorld[i].countryiso3code === country.id) {
            indicator = { value: gniWorld[i].value, date: gniWorld[i].date };
            break;
          }
        }

        return ({
          ...country,
          ...indicator,
        })
      }),
    }

  }

  //  for countries: "id": "ABW",
  // gni: countryiso3code
  useEffect(() => {
    if (gniWorld.length === 0) {
      dispatch(fetchGniWorld());
    }
    if (gniWorld.length > 0 && !(groupId in groupCountries)) {
      dispatch(fetchCountries(groupId));
    }
  }, [gniWorld]);

  if (gniWorldLoadingStatus === 'starting' || countriesLoadingStatus === 'starting') {
    return (
      <section className={`${styles.spinnerContainer}`}>
        <LoadAnimation />
      </section>
    );
  };

  console.log('current', currentCountries);

  return (
    <section>
      {/* {currentCountries.fetched && console.log('hello')} */}
      {/* <GroupHeader
        currentPath={currentPath}
        groupId={groupId}
      /> */}
      <div className="details-container">
        {currentCountries.fetched && currentCountries.countries
          .sort((a, b) => a.value < b.value)
          .map((country) => (
            <li key={country.id} className={`${styles.countryWrapper}`}>
              <Country country={country} />
            </li>
          ))}
          {/* .forEach((country) => console.log('country: ', country)) */}
      </div>
    </section>
  );
};

/* Details.propTypes = {
  groupId: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
}; */

export default Countries;
