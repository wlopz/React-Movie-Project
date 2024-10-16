import React from 'react';
import '../../index.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton__wrapper">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  );
};

export default SkeletonLoader;
