import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  openButton: {
    color: '#028FDF',
    background: '#fff',
    border: '1px solid #028FDF',
    borderWidth: 1,
    display: 'flex',
    padding: '0px 10px',
    fontSize: 13,
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 3,
    height: 30,
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  openButtonIcon: {
    color: '#028FDF',
    fontSize: 15,
    marginRight: 6,
  },
  viewButtonText: {
    marginTop: 1,
  },
  input: {
    '& > div': {
      width: '100%',
    }
  },
  textarea: {
    '& > textarea': {
      padding: '6.5px !important',
    }
  }
}));
