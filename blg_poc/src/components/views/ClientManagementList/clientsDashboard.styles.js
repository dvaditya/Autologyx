import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    position: 'relative',
  },
  matterDetailWrapper: {
    position: 'absolute',
    height: '100%',
    right: '0',
  },
  sidebarWrapper: {
    height: 'calc(100vh - 66px)',
    width: '100%',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 48%)',
    top: 0,
    left: 0,
  },
  pageContent: {
    width: 'calc(100% - 30px)',
    padding: 15,
  },
});
