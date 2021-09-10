import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const sizing = {
  width: '14rem',
  height: '14rem',
};

const LoadAnimation = () => (
  <div className="spinner-border" role="status" style={sizing}>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadAnimation;
