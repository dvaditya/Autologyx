import React from 'react';
import skeletonLoaderStyles from './skeletonLoader.styles';

const SkeletonLoader = ({ height }) => {
  const classes = skeletonLoaderStyles();
  return <div className={classes.root} style={{ height: height }}></div>;
};

SkeletonLoader.defaultProps = {
  height: 200,
};

export default SkeletonLoader;
