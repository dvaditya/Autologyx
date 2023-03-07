import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  ul: {
    margin: '1rem',
    listStyle: 'none',
    '& li': {
      border: '1px solid #d3dee7',
      padding: '10px 1rem',
      marginBottom: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 14,
    },
  },
}));
