import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

const LoadAnimation = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadAnimation;
