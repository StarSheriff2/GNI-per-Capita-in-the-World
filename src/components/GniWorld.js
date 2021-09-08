import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchGniWorld } from '../redux/gniWorld/gniWorld';
import RegionsList from './RegionsList';
import IncomeGroupsList from './IncomesGroupList';

const GniWorld = () => {
  const dispatch = useDispatch();

  const gniWorld = useSelector((state) => state.gniWorld.entities, shallowEqual);
  const loadingStatus = useSelector((state) => state.gniWorld.status);

  useEffect(() => {
    if (gniWorld[0].length === 0) {
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
      <RegionsList regions={gniWorld[0]} />
      <IncomeGroupsList incomeGroups={gniWorld[1]} />
    </div>
  );
};

export default GniWorld;
