import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    border: '1px solid #d3dee7',
    height: '100%',
  },
  header: {
    backgroundColor: '#ecf0f5',
    color: '#2e3f57',
    padding: '10px 24px',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 600,
  },
  content: {
    padding: '1rem',
    height: 'calc(100% - 39px)',
  },
}));
