import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    background: 'white',
    height: '100%',
  },
  ul: {
    listStyle: 'none',
    padding: '1rem',
    overflowY: 'scroll',
    height: '100%',
  },
  li: {
    padding: '10px',
    backgroundColor: '#ecf0f5',
    fontSize: 13,
    borderRadius: '3px',
    marginBottom: '2px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    display: 'flex',
  },
  date: {

    color: '#8a8e90'
  },
  pdfIcon: {
    height: 23,
    marginRight: 10,
    '& path': {
      fill: '#0b324b',
    },
  },
  docxIcon: {
    height: 21,
    marginRight: 10,
    '& path': {
      fill: '#0b324b',
    },
  },
  downloadIcon: {
    color: '#0b324b',
  },
}));
