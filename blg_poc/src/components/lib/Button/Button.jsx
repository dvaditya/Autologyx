import React from 'react';
import { CircularProgress } from '@material-ui/core';
import buttonStyles from './button.styles';

const Button = ({
  children,
  type,
  disabled,
  onClick,
  classNames,
  loading,
  fullWidth,
  ...rest
}) => {
  const classes = buttonStyles();

  return (
    <button
      {...rest}
      onClick={(e) => {
        if (!loading) {
          onClick(e);
        }
      }}
      disabled={disabled}
      type={type}
      className={`${classes.button} ${classes[type]} ${classNames} ${
        fullWidth ? classes.fullWidth : ''
      }`}
    >
      {children}
      {loading ? (
        <CircularProgress size={13} className={classes.loader} />
      ) : null}
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
  classNames: '',
  onClick: () => true,
  disabled: false,
  loading: false,
  fullWidth: false,
};

export default Button;
