import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    marginBottom: '1.5rem',
  },
  label: {
    color: 'rgb(46, 63, 87)',
    display: 'block',
    fontSize: 12,
    marginLeft: 6,
    marginBottom: 6,
  },
  pillWrapper: {
    display: 'flex',
  },
  pill: {
    background: '#F3F5F8',
    border: '1px solid #D2D9E7',
    boxSizing: 'border-box',
    borderRadius: '5px',
    marginRight: '0.5rem',
    padding: '4px 9px',
    color: '#2e3f57',
    fontWeight: 700,
    fontSize: 14,
  },
  editIcon: {
    fontSize: '0.9rem',
    marginLeft: 4,
    cursor: 'pointer',
  },
  empty: {
    padding: 10,
    fontSize: 14,
    border: '1px dashed #d3dee7',
    color: '#878f96',
    marginTop: 4,
    cursor: 'pointer',
  },
});
