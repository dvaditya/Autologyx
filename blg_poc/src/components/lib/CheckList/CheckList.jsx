import React from 'react';
import checklistStyles from './checklist.styles';
import Checkbox from '../Checkbox';

const CheckList = ({ items }) => {
  const classes = checklistStyles();
  return (
    <ul className={classes.ul}>
      {items.map(item => (
        <li>
          {item.name}{' '}
          <div>
            <Checkbox checked={false} />
          </div>
        </li>
      ))}
    </ul>
  );
};

CheckList.defaultProps = {
  items: [],
};

export default CheckList;
