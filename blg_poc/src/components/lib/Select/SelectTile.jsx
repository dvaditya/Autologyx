import React from 'react';
import selectTileStyles from './selectTile.styles';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: 'white',
    padding: '7.5px',
    boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    fontSize: 14,
    '&.MuiNativeSelect-select.MuiNativeSelect-select': {
      paddingRight: 19,
    },
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
      transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
      // borderColor: '#40a9ff',
      borderRadius: 2,
    },
  },
}))(InputBase);

const SelectTile = ({
  options,
  value,
  onChange,
  required,
  classNames,
  label,
  onClick,
  placeholder,
  emptyOption,
  disabled,
  name,
  helperText,
}) => {
  const classes = selectTileStyles();

  // Here we can default multiple class names
  classNames = {
    formControl: '',
    select: '',
    ...classNames,
  };

  return (
    <>
      <FormControl className={`${classes.margin} ${classNames.formControl}`}>
        {label ? <div className={classes.label}>{label} {helperText && (<span style={{color: 'red'}}>&nbsp;*<span style={{fontSize: '10px'}}>&nbsp;{helperText}</span></span>)}</div> : null}
        
        {placeholder.length ? (
          <FormHelperText>{placeholder}</FormHelperText>
        ) : null}
        <NativeSelect
          name={name}
          id="demo-customized-select-native"
          value={value}
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames.select}
          disabled={disabled}
          input={
            <BootstrapInput
              style={{
                border:
                  required && value === ''
                    ? '1px solid red'
                    : '1px solid #d3dee7',
                borderRadius: 2,
              }}
            />
          }
        >
          {emptyOption ? <option aria-label="None" value="" /> : null}
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </>
  );
};

SelectTile.defaultProps = {
  label: false,
  options: [],
  placeholder: '',
  onClick: () => true,
  emptyOption: false,
};

export default SelectTile;
