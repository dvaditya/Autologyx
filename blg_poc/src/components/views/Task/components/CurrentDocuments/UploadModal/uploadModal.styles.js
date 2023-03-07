import { makeStyles } from '@material-ui/core/styles';
import { maxWidth } from '@material-ui/system';

export default makeStyles(() => ({
  root: {
    width: 600,
    fontSize: 17,
  },
  headerContainer: {
    display: 'flex',
    position: 'relative',
    padding: '15px 0 0 25px',
    alignItems: 'center',
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 4,
    right: 2,
    cursor: 'pointer'
  }, 
  dropZoneContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& > button': {
      width: 100,
      textAlign: 'center',
      justifyContent: 'center',
      fontWeight: 400,
    }
  },
}));
