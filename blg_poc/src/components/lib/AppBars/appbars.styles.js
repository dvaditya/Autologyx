import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
  },
  pageWrapper: {
    width: 'calc(100vw - 80px)',
    // overflow: 'hidden',
    marginLeft: '80px',
  },
  contentWrapper: {
    height: 'calc(100% - 64px)',
    position: 'relative',
    top: 15,
    marginTop: '95px'
  },
}));
