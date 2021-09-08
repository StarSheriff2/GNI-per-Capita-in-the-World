import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchGniWorld } from '../../redux/gniWorld/gniWorld';
import GroupsList from '../GroupsList/GroupsList';
// import IncomeGroupsList from '../IncomesGroupsList.js/IncomesGroupList';
// import styles from './GniWorld.module.scss';

const GniWorld = () => {
  const dispatch = useDispatch();

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const loadingStatus = useSelector((state) => state.gniWorld.status);

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

  /* const changeCategory = (category) => {
    return (category === 'region') ? 'income' : 'region';
  } */

  return (
    <div className="gni-world-container">
      <GroupsList groups={gniWorld} category="region" />
    </div>
  );
};

export default GniWorld;
