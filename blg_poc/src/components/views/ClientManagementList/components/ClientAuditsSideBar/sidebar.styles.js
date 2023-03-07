import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    background: 'white',
    border: '1px solid rgb(231, 234, 236)',
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    height: 50,
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    fontSize: 12,
    cursor: 'pointer',
    '&:active': {
      borderBottom: 0,
    },
    '&:first-child': {
      borderLeft: '0 !important',
    },
    '&:last-child': {
      borderRight: 0,
    },
  },
  selectedContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 50px)',
  },
  closeButton: {
    width: 40,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
}));
