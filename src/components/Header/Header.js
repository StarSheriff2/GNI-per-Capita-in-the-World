import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = (props) => {
  const { currentPath, updatePath } = props;
  const { path } = currentPath;

  let backArrow = (
    <NavLink
      className={styles.backArrow}
      to="/"
      onClick={() => {
        updatePath({
          ...currentPath,
          path: '/',
        });
      }}
    >
      &#60;
    </NavLink>
  );

  let navigationPath = (
    <p className={`${styles.navigationPath}`}>
      gni per capita per country
    </p>
  );

  if (path === '/') {
    backArrow = (
      <div className="d-none" />
    );
    navigationPath = (
      <p className={`${styles.homePath}`} data-testid="headerText">gni per capita in the world</p>
    );
  }

  return (
    <header className={`d-flex ${styles.header}`} data-testid="header">
      {backArrow}
      {navigationPath}
    </header>
  );
};

Header.propTypes = {
  currentPath: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  updatePath: PropTypes.func.isRequired,
};

export default Header;
