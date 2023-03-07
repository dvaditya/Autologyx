import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // position: 'relative',
    background: '#0099ff',
    height: '64px',
    width: '96%',
    display: 'flex',
    padding: 0,
    justifyContent: 'space-between',
    boxShadow: 'rgba(0, 23, 49, 0.24) 0px 3px 10px',
    transition: 'all 0.2s ease 0s',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'fixed',
    zIndex: '99'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 36,
    fontSize: 14,
    color: '#2e3f57',
  },
  avatar: {
    backgroundColor: '#002c5f',
    width: 32,
    height: 32,
    lineHeight: '32px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      fontSize: 33,
      color: '#0b324b',
    },
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
    width: '100%'
  },
}));
