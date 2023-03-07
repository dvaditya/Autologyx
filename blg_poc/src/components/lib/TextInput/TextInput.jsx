import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const sharedStyles = {
  // boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
  // border: '1px solid #d9d9d9',
  fontSize: 14,
  '& fieldset': {
    borderColor: 'rgb(211, 222, 231)',
    borderRadius: 3,
    fontWeight: '400',
  },
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .MuiOutlinedInput-input': {
      padding: 10,
      ...sharedStyles,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(211, 222, 231)',
      borderRadius: 2,
    },
  },
  largeField: {
    '& .MuiInputBase-input': {
      minHeight: 100,
      ...sharedStyles,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(211, 222, 231)',
      borderRadius: 2,
    },
  },
  label: {
    color: 'rgb(46, 63, 87)',
    display: 'block',
    fontSize: 12,
    // marginLeft: 6,
    marginBottom: 4,
  },
}));

const TextInput = ({
  placeholder,
  value,
  setValue,
  large,
  required,
  disabled,
  label,
  email,
  type="text",
  name,
  helperText,
  onBlur = () => {}
}) => {
  const classes = useStyles();

  // TODO jack - we shouldn't be conditionally rendering based on props,
  // the props should be set on a single textfield

  const helper = (
    <div className={classes.label}>
      {label}
      {helperText && (<span style={{color: 'red'}}>&nbsp;*<span style={{fontSize: '10px'}}>&nbsp;{helperText}</span></span>)}
    </div>
  )


  if (large) {
    return (
      <>
        <div className={classes.label}>{`${label} ${helperText}`}</div>
        <TextField
          className={classes.largeField}
          color="primary"
          fullWidth={true}
          placeholder={placeholder}
          error={required && !value ? true : false}
          multiline
          variant="outlined"
          disabled={disabled}
          value={value}
          onChange={setValue}
          type={type}
          name={name}
          onBlur={onBlur}
        />
      </>
    );
  }

  
  return (
    <>
      {helper}
      <TextField
        className={classes.root}
        color="primary"
        fullWidth={false}
        placeholder={placeholder}
        error={required && !value ? true : false}
        variant="outlined"
        disabled={disabled}
        value={value}
        onChange={setValue}
        type={type}
        name={name}
        onBlur={onBlur}
      />
    </>
  );
};

TextInput.defaultProps = {
  label: '',
  helperText: null
};

export default TextInput;
