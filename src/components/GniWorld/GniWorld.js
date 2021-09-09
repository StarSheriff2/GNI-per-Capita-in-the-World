import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchGniWorld } from '../../redux/gniWorld/gniWorld';
import GroupsList from '../GroupsList/GroupsList';
import Filter from '../Filter/Filter';
// import IncomeGroupsList from '../IncomesGroupsList.js/IncomesGroupList';
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

  const changeCategoryFilter = () => {
    if (categoryFilter.current === 'region') {
      setCategoryFilter({
        current: 'income',
        other: 'region',
      });
    } else {
      setCategoryFilter({
        current: 'region',
        other: 'income',
      });
    }
  };

  useEffect(() => {
    if (gniWorld.length === 0) {
      dispatch(fetchGniWorld());
    }
  }, []);

  if (loadingStatus === 'starting') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="gni-world-container">
      <Filter
        otherCategory={categoryFilter.other}
        changeCategoryFilter={changeCategoryFilter}
      />
      <GroupsList groups={gniWorld} category={categoryFilter.current} updatePath={updatePath} />
    </div>
  );
};

GniWorld.propTypes = {
  updatePath: PropTypes.func.isRequired,
};

export default GniWorld;
