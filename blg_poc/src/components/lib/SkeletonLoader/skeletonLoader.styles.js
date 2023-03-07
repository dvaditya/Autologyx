import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    backgroundColor: '#e2e7ec',
    width: '100%',
    borderRadius: 3,
    animationName: '$pulse',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    marginBottom: '1rem',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: '0.2',
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: '0.2',
    },
  },
}));
