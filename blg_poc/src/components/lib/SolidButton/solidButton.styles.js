import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '&.MuiButton-containedPrimary': {
      backgroundColor: '#028FDF',
      borderRadius: 20,
      padding: '5px 10px',
      textTransform: 'capitalize',
      fontSize: 12,
    },
    '&.MuiButton-contained': {
      boxShadow: 'none',
    },
    fontSize: 13,
  },
}));
