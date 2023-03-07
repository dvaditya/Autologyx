import React from 'react';
import pillsStyles from './pills.styles';
import EditIcon from '@material-ui/icons/Edit';

const Pills = ({ title, pills, edit, emptyMsg }) => {
  const classes = pillsStyles();

  const handleEdit = () => {
    edit ? edit() : null;
  };
  return (
    <div className={classes.root}>
      <div className={classes.label} onClick={handleEdit}>
        {title} {edit ? <EditIcon className={classes.editIcon} /> : null}
      </div>
      <div className={classes.pillWrapper}>
        {pills.length ? (
          pills.map(p => (
            <div className={classes.pill} key={p.id}>
              {p.name}
            </div>
          ))
        ) : (
          <div className={classes.empty} onClick={handleEdit}>
            {emptyMsg}
          </div>
        )}
      </div>
    </div>
  );
};

Pills.defaultProps = {
  title: '',
  edit: false,
  pills: [],
  emptyMsg: 'No Pills Available',
};

export default Pills;
