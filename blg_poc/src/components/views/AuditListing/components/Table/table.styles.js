import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  openButton: {
    color: '#3ab0de',
    background: '#fff',
    border: '1px solid #3ab0de',
    borderWidth: 1,
    display: 'flex',
    padding: '0px 10px',
    fontSize: 13,
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 4,
    height: 30,
    cursor: 'pointer',
  },
  openButtonIcon: {
    color: '#3ab0de',
    fontSize: 15,
    marginRight: 6,
  },
}));
