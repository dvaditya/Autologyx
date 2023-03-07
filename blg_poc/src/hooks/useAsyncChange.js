import React, { useState, useEffect, useRef } from 'react';
const LIMIT = 3000;

export default (initialValue, onThrottle) => {
  const [localState, setLocalState] = useState(initialValue);
  const [isError, setErrored] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const savedCallback = React.useRef();

  const setError = () => {
    setErrored(true);
  };

  useEffect(() => {
    savedCallback.current = onThrottle;
  }, [onThrottle]);

  useEffect(() => {
    function tick() {
      savedCallback.current(localState);
    }
    if (LIMIT !== null) {
      let id = setTimeout(tick, LIMIT);
      return () => clearTimeout(id);
    }
  }, [LIMIT]);

  return [
    localState,
    setLocalState,
    {
      isError,
      setError,
      isLoading,
    },
  ];
};
