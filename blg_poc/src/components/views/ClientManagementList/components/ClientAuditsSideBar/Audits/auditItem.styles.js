import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: 50,
    padding: 10,
    fontSize: 12,
    background: '#ecf0f5',
    alignItems: 'center',
    borderRadius: 5,
    margin: '0 0 6px 0',
    color: '#231231',
    '& svg': {
      color: '#2e3f57',
    },
  },
  icon: {
    height: 20,
    marginRight: 10,
    '& path': {
      fill: '#1a293e',
    },
  },
  title: {
    fontWeight: 600,
  },
  select: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '50%',
  },
  status: {
    color: '#38383899',
  },
}));
