import React from 'react';

// TODO add throttle and add loading and error
const AsyncField = ({
  Field,
  observeChange,
  value,
  request,
  children,
  ...rest
}) => {
  const [localValue, setLocalValue] = React.useState(value);
  const [hasInitialised, setHasInitialised] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (typeof value !== 'undefined' && !hasInitialised) {
      setLocalValue(value);
      setHasInitialised(true);
    }
  }, [value]);

  const handleSetValue = e => {
    setLocalValue(e.target.value);
    request(e);
  };

  return (
    <Field value={localValue} onChange={handleSetValue} {...rest}>
      {children}
    </Field>
  );
};

AsyncField.defaultProps = {
  observeChange: () => true,
};

export default AsyncField;
