import React from 'react';

const Monetary = ({ int, currency }) => {
  return (
    <span>
      {currency ? `${currency} ` : ''}
      {int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ')}
    </span>
  );
};

Monetary.defaultProps = {
  int: 0,
  currency: '$',
};

export default Monetary;
