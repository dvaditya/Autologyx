import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  },
  info: {
    fontSize: 10,
    color: 'grey',
    marginLeft: 5,
  },
  bubble: {
    color: '#000',
    padding: '7px 10px',
    fontSize: 13,
    marginTop: 2,
    position: 'relative',
    borderRadius: '.4em',
    border: '0.5px solid rgb(231, 234, 236)',
    width: '90%',
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  youBubble: {
    background: '#3ab0de',
    color: '#fff',
  },
}));
