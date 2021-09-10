import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchGniWorld } from '../../redux/gniWorld/gniWorld';
import GroupsList from '../GroupsList/GroupsList';
import Filter from '../Filter/Filter';
import LoadAnimation from '../LoadAnimation/LoadAnimation';
// import styles from './GniWorld.module.scss';

const GniWorld = (props) => {
  const dispatch = useDispatch();

  const { currentCategory, updatePath } = props;
  const { current, other } = currentCategory;

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const loadingStatus = useSelector((state) => state.gniWorld.status);

  const [categoryFilter, setCategoryFilter] = useState({
    current,
    other,
  });

  const changeCategoryFilter = () => setCategoryFilter((actualCategory) => ({
    current: actualCategory.other,
    other: actualCategory.current,
  }));

  useEffect(() => {
    if (gniWorld.length === 0) {
      dispatch(fetchGniWorld());
    }
  }, []);

  if (loadingStatus === 'starting') {
    return (
      <LoadAnimation />
    );
  }

  return (
    <div className="gni-world-container">
      <Filter
        currentCategory={categoryFilter.current}
        otherCategory={categoryFilter.other}
        changeCategoryFilter={changeCategoryFilter}
      />
      <GroupsList groups={gniWorld} category={categoryFilter} updatePath={updatePath} />
    </div>
  );
};

GniWorld.propTypes = {
  updatePath: PropTypes.func.isRequired,
  currentCategory: PropTypes.shape({
    current: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
  }).isRequired,
};

export default GniWorld;
