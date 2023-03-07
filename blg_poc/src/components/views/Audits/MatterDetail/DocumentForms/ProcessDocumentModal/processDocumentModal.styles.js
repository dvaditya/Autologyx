import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    margin: '3rem',
    width: 522,
  },
  downloadButton: {
    color: '#2e3f57',
    cursor: 'pointer',
    display: 'flex',
    padding: '1rem',
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'space-between',
    textDecoration: 'none',
    backgroundColor: '#ecf0f5',
    borderRadius: '3px',
    marginBottom: '1.2rem',
  },
  downloadButtonTextWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      fontSize: '20px',
      marginRight: '15px',
    },
  },
  sectionWrapper: {
    marginBottom: '1.2rem',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: '1.6rem',
  },
  paragraphWMargin: {
    fontSize: 15,
    lineHeight: '1.6rem',
    marginBottom: '0.7rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  newFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subHeader: {
    flex: '1', 
    alignSelf: 'center', 
    fontSize: 13
  },
  subSelectContainer: {
    flex: '1'
  }
}));
