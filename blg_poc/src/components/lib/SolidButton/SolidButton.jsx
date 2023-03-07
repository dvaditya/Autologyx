import React from 'react';
import Button from '@material-ui/core/Button';
import solidButtonStyles from './solidButton.styles';

const SolidButton = ({ onClick, children }) => {
  const classes = solidButtonStyles();

  return (
    <Button
      className={classes.root}
      onClick={onClick}
      variant="contained"
      color="primary"
    >
      {children}
    </Button>
  );
};

SolidButton.defaultProps = {
  onClick: () => true,
};

export default SolidButton;
