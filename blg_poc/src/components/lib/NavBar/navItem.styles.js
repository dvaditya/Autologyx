import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  navWrapper: {
    color: '#9eabcb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 11%)',
    },
  },
  navItem: {
    width: 40,
    height: 40,
    borderRadius: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '40px',
    margin: '6px 0',
    height: 40,
    '&.active': {
      backgroundColor: '#00a7b5',
      color: '#fff',
    },
  },
  navIcon: {},
}));
