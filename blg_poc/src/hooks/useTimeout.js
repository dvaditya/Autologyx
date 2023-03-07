import React from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();
  const [id, setId] = React.userState();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      setId(setTimeout(tick, delay));
      return () => clearTimeout(id);
    }
  }, [delay]);

  return [id];
};

export default useTimeout;
