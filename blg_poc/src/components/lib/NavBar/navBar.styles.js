import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    background: '#002c5f',
    height: '100vh',
    width: '80px',
    zIndex: 999,
    paddingTop: 60,
    position: 'fixed'
  },
  logoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: 'white',
    marginLeft: 10,
  },
  logo: {
    height: 43,
    imageRendering: '-webkit-optimize-contrast',
    msInterpolationMode: 'nearest-neighbor',
    width: '100%',
  },
  navWrapper: {
    color: '#002c5f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(21, 27, 68)',
    },
  },
  navItem: {
    width: 40,
    height: 25,
    borderRadius: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '40px',
    margin: '6px 0',
    '&.active': {
      backgroundColor: '#eee !important',
      color: '#002c5f !important',
    },
  },
}));
