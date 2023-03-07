import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  notesChat: {
    display: 'flex',
    padding: 15,
    flexDirection: 'column',
    boxSizing: 'border-box',
    height: 'calc(100% - 194px)',
    width: 'calc(100% - 10px)',
    overflowY: 'scroll',
  },
  notesChatReadOnly: {
    display: 'flex',
    padding: 15,
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: 'calc(100% - 10px)',
    overflowY: 'scroll',
  },
  bubbleContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: 5,
  },
  SubmissionContainer: {
    display: 'flex',
    flexDirection: 'row',
    top: 5,
    width: '100%',
    borderTop: '1px solid rgb(231, 234, 236)',
  },
  text: {
    width: '80%',
    padding: 20,
    paddingRight: 'none',
    fontSize: 14,
  },
  button: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginRight: 20,
    marginBottom: 20,
  },
}));
