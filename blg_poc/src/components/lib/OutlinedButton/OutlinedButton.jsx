import React from 'react';
import Button from '@material-ui/core/Button';

const OutlinedButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} variant="outlined" color="primary">
      {children}
    </Button>
  );
};

OutlinedButton.defaultProps = {
  onClick: () => true,
};

export default OutlinedButton;
