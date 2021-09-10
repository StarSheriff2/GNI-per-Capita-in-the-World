import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { currentPath, updatePath } = props;
  const { path } = currentPath;

  let backArrow = (
    <NavLink
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

  if (path === '/') {
    backArrow = (
      <div className="d-none" />
    );
  }

  return (
    <div>
      {backArrow}
    </div>
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
