import React from 'react';
import { Checkbox as MaterialCheckbox } from '@material-ui/core';
import checkboxStyles from './checkbox.styles';

const Checkbox = ({
  children,
  disabled,
  label,
  onChange,
  onClick,
  onFocus,
  checked,
  name,
  color
}) => {
  const classes = checkboxStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <MaterialCheckbox
        checked={checked}
        onClick={onClick}
        color={color}
        name={name}
        disabled={disabled}
        onFocus={onFocus}
        onChange={onChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
};

Checkbox.defaultProps = {
  onChange: () => true,
  onClick: () => true,
  onFocus: () => true,
  disabled: false,
  //color: "#34a7b5"
};

export default Checkbox;
