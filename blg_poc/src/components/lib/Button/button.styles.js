import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  button: {
    display: 'flex',
    padding: '5px 15px',
    fontSize: '0.875rem',
    alignItems: 'center',
    borderRadius: 4,
    height: 36,
    border: '1px solid',
    cursor: 'pointer',
    '&:disabled': {
      border: '1px solid #cecece',
      backgroundColor: '#dad8d8',
      color: '#949494',
      cursor: 'not-allowed',
    },
  },
  primary: {
    backgroundColor: '#002c5f',
    textShadow: 'none',
    borderColor: '#34a7b5',
    color: '#fff',
    '& svg': {
      color: '#fff',
    },
  },
  submit: {
    backgroundColor: '#002c5f',
    textShadow: 'none',
    borderColor: '#34a7b5',
    color: '#fff',
    '& svg': {
      color: '#fff',
    },
  },
  secondary: {
    textShadow: 'none',
    color: '#586C93',
    borderColor: '#D3DEE7',
    backgroundColor: '#fff',
  },
  loader: {
    marginLeft: 10,
  },
  fullWidth: {
    width: '100%',
    justifyContent: 'center',
  },
}));
