import React from 'react';
import textareaStyles from './textarea.styles';
import TextareaAutosize from 'react-textarea-autosize';
import { useField } from 'formik';
import clsx from 'clsx';
const Textarea = ({
  value,
  rows,
  classNames,
  targetClassNames,
  fullWidth,
  sidebar,
  onChange,
  label,
  isFormikField,
  onBlur,
  name,
  placeholder,
  required,
  table,
}) => {
  const classes = textareaStyles();
  const [{ onChange: handleChange }, { value: formikValue }] = useField(name);
  const handleKeyDown = e => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  // TODO jack we need to avoid having renders based on where it's used
  // we should instead be passing props in to change everything
  if (sidebar) {
    return (
      <div
        className={`${classNames} ${classes.textareaWrapper} ${
          fullWidth ? classes.fullWidth : sidebar ? classes.sidebar : ''
        }`}
      >
        {label.length ? (
          <label htmlFor="" className={classes.label}>
            {label}
          </label>
        ) : null}
        {required && value === '' ? (
          <textarea
            rows={rows}
            style={{ border: '1px solid red' }}
            className={`${classes.textarea} ${targetClassNames} ${classes.sidebar}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            name={name}
          />
        ) : (
          <textarea
            rows={rows}
            className={`${classes.textarea} ${targetClassNames} ${classes.sidebar}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            name={name}
          />
        )}
      </div>
    );
  }

  if (table) {
    return (
      <div
        style={{ width: '97%' }}
        className={`${classNames} ${classes.textareaWrapper} ${
          fullWidth ? classes.fullWidth : sidebar ? classes.sidebar : ''
        }`}
      >
        {label.length ? (
          <label htmlFor="" className={classes.label}>
            {label}
          </label>
        ) : null}
        {required && value === '' ? (
          <textarea
            rows={rows}
            style={{ border: '1px solid red' }}
            className={`${classes.textarea} ${targetClassNames} ${
              fullWidth ? classes.fullWidth : ''
            }`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
          />
        ) : (
          <textarea
            rows={rows}
            className={`${classes.textarea} ${targetClassNames} ${
              fullWidth ? classes.fullWidth : ''
            }`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`${classNames} ${classes.textareaWrapper} ${
        fullWidth ? classes.fullWidth : sidebar ? classes.sidebar : ''
      }`}
    >
      {label.length ? (
        <label htmlFor="" className={classes.label}>
          {label}
        </label>
      ) : null}
      {isFormikField ? (
          <TextareaAutosize
            className={clsx(classes.textarea, classNames)}
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            value={typeof formikValue === 'string'
              ? formikValue?.replaceAll('\\n', String.fromCharCode(13, 10))
              : ''}
          />
      ) : (
        <>
          {required && value === '' ? (
            <textarea
              rows={rows}
              style={{ border: '1px solid red' }}
              className={`${classes.textarea} ${targetClassNames} ${
                fullWidth ? classes.fullWidth : ''
              }`}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              name={name}
            />
          ) : (
            <textarea
              rows={rows}
              className={`${classes.textarea} ${targetClassNames} ${
                fullWidth ? classes.fullWidth : ''
              }`}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              name={name}
            />
          )}
        </>
      )}
    </div>
  );
};

Textarea.defaultProps = {
  rows: 3,
  fullWidth: false,
  value: '',
  sidebar: false,
  isFormikField: false,
  classNames: '',
  targetClassNames: '',
  onChange: () => true,
  onBlur: () => true,
  label: '',
  placeholder: '',
  name: ""
};

export default Textarea;
