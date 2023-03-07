import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    height: 'calc(100% - 118px)',
    padding: 25,
    width: 'calc(100% - 50px)',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
    padding: 0,
    width: '100%',
    border: '1px solid #b9b9b9',
    borderRadius: 5,
  },
  icon: {
    '&.MuiSvgIcon-root': {
      fontSize: 70,
    },
  },
  loaderWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(255 255 255 / 58%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    textAlign: 'center',
    color: '#505050',
    fontSize: 14,
  },
  loader: {
    '& svg': {
      color: '#2f8fce',
    },
  },
}));
