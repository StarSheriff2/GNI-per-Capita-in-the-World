// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchGniWorld } from '../../redux/gniWorld/gniWorld';
import GroupsList from '../GroupsList/GroupsList';
import Filter from '../Filter/Filter';
import LoadAnimation from '../LoadAnimation/LoadAnimation';
import styles from './GniWorld.module.scss';
import regionsApiCodes from '../../filters/regions';
import incomeLevelApiCodes from '../../filters/incomeLevel';

const GniWorld = (props) => {
  const dispatch = useDispatch();

  const { currentCategory, updatePath } = props;
  const { current, other } = currentCategory;

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const loadingStatus = useSelector((state) => state.gniWorld.status);
  const [regions, setRegions] = useState({ loaded: false, entities: [] });
  const [incomeLevels, setIncomeLevels] = useState({ loaded: false, entities: [] });

  const getRegions = () => gniWorld.filter((entity) => regionsApiCodes.includes(entity.country.id));
  const getIncomeLevels = () => gniWorld.filter((entity) => incomeLevelApiCodes.includes(entity.country.id));

  /*  const [categoryFilter, setCategoryFilter] = useState({
    current,
    other,
  }); */

  /* const changeCategoryFilter = () => setCategoryFilter((actualCategory) => ({
    current: actualCategory.other,
    other: actualCategory.current,
  })); */

  useEffect(() => {
    if (gniWorld.length === 0) {
      dispatch(fetchGniWorld());
    }
    if (gniWorld.length > 0) {
      setRegions({
        category: 'region',
        loaded: true,
        entities: getRegions(),
      });
      setIncomeLevels({
        category: 'income',
        loaded: true,
        entities: getIncomeLevels(),
      });
    }
  }, [gniWorld]);

  if (loadingStatus === 'starting' || !regions.loaded || !incomeLevels.loaded) {
    return (
      <section className={`${styles.spinnerContainer}`}>
        <LoadAnimation />
      </section>
    );
  }

  return (
    <section>
      <Filter
        currentCategory={current}
        otherCategory={other}
        updatePath={updatePath}
      />
      <div className={`${styles.groupListContainer}`}>
        <GroupsList
          groups={((regions.category === current) ? regions : incomeLevels)}
          category={{ current, other }}
          updatePath={updatePath}
        />
      </div>
    </section>
  );
};

/* GniWorld.propTypes = {
  updatePath: PropTypes.func.isRequired,
  currentCategory: PropTypes.shape({
    current: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
  }).isRequired,
}; */

export default GniWorld;
