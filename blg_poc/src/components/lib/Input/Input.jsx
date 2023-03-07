import React from 'react';
import inputStyles from './input.styles';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { Field } from 'formik';

const Input = ({
  value,
  inputClass,
  wrapperClass,
  type,
  fullWidth,
  onChange,
  onBlur,
  label,
  placeholder,
  required,
  name,
  isFormikField,
  disabled,
  error, 
  helperText
}) => {
  const classes = inputStyles();
  const [curType, setCurType] = React.useState(false);
  // TODO jack this required logic needs to be sorted out - if props are being passed conditionally,
  // then do that in the props rather than different component being returned.
  React.useEffect(() => {
    setCurType(type);
  }, [type]);

  const toggleType = () => {
    setCurType(curType === 'password' ? 'text' : 'password');
  };

  return (
    <div
      className={`${wrapperClass} ${inputClass} ${
        fullWidth ? classes.fullWidthWrapper : ''
      } ${classes.inputWrapper}`}
    >
      {label.length ? (
        <label htmlFor="" className={classes.label}>
          {label} {helperText && helperText}
        </label>
      ) : null}
      <span className={classes.inputInnerWrapper}>
        {isFormikField ? (
          <Field
            disabled={disabled}
            className={` ${classes.input} ${fullWidth ? classes.fullWidth : ''}`}
            style={{ padding: 8, border: required ? '1px solid red' : null }}
            placeholder={placeholder}
            name={name}
          />
        ) : (
          <input
            disabled={disabled}
            className={` ${classes.input} ${
              type === 'password' ? classes.passInput : ''
            } ${fullWidth ? classes.fullWidth : ''} ${
              type === 'date' ? classes.date : ''
            }`}
            style={{ padding: 8, border: required ? '1px solid red' : null }}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type={type}
            name={name}
          />
        )}

        {type === 'password' ? (
          <button onClick={toggleType} className={classes.displayButton}>
            {curType === 'password' ? (
              <VisibilityOutlinedIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </button>
        ) : null}
      </span>
      <div className={classes.error}>
        {error}
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  fullWidth: false,
  isFormikField: false,
  value: '',
  inputClass: '',
  disabled: false,
  wrapperClass: '',
  onChange: () => true,
  onBlur: () => true,
  label: '',
  placeholder: '',
  error: ""
};

export default Input;
