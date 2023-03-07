import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(0, 0, 0,  45%)',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 10000,
    '& svg': {
      color: '#1C54A4',
    },
  },
  message: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '30px'
  }
});
