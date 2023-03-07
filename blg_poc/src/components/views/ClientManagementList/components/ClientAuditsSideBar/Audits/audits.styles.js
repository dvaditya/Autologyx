import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px',
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    fontSize: 12,
  },
  tasksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },
  tabbedContent: {
    background: 'white',
    zIndex: 1000,
    height: 'calc(100% - 50px)',
  },
  noTasks: {
    border: '1px solid #d6d6d6',
    fontSize: '0.9rem',
    height: 'calc(100% - 152px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#c3c3c3',
    padding: '1rem',
    textAlign: 'center',
    margin: 15,
  },
  loaderWrapper: {
    padding: '1rem',
    height: '100%',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 15px 0 15px',
    flexDirection: "row-reverse"
  },
  test: {
    color: 'red'
  }
}));
