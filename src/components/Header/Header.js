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
      {path
        .replace(/groups\//, '')
        .replace(/\//g, '')
        .replace(/-/g, ' ')
        .replace(/and/g, '&')}
    </p>
  );

  if (path === '/') {
    backArrow = (
      <div className="d-none" />
    );
    navigationPath = (
      <p className={`${styles.homePath}`}>GNI per Capita in the World</p>
    );
  }

  return (
    <header id="header-id" className={`d-flex ${styles.header}`}>
      {backArrow}
      {navigationPath}
    </header>
  );
};

Header.propTypes = {
  currentPath: PropTypes.shape({
    path: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    currentCategory: PropTypes.shape({
      current: PropTypes.string.isRequired,
      other: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updatePath: PropTypes.func.isRequired,
};

export default Header;
