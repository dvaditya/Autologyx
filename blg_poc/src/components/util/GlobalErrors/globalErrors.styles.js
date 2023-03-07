import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    margin: '3rem',
    width: '450px',
    textAlign: 'center',
    '& svg': {
      fontSize: '3.5rem',
      color: '#fb5151',
      marginBottom: '1rem',
    },
  },
  paragraphMain: {
    fontSize: '1.05rem',
    color: '#222',
    marginBottom: '1.5rem',
  },
  paragraph: {
    marginBottom: '1.5rem',
    color: '#8c8c8c',
  },
  reportProblemButton: {
    margin: '0 auto',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
