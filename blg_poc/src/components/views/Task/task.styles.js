import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    background: 'white',
    display: 'flex',
  },
  inputContainerWrapper: {
    height: 75,
  },
  taskDetailFormHeightWrapper: {
    height: 75,
    marginBottom: 25,
  },
  inputContainer: {
    padding: '15px',
  },
  sidebarSubHeader: {
    display: 'flex',
    justifyContent: 'center',
    background: '#ecf0f5',
    fontSize: 14,
    height: 50,
    fontWeight: 600,
    alignItems: 'center',
  },
  emailPreviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  emailDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  emailDetails: {
    width: '100%',
    padding: '5px 0px 5px 5px',
    fontSize: 12,
    borderBottom: '1px solid gray',
  },
  filesContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 5,
  },
  fileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileTitle: {
    fontSize: 12,
  },
  emailContent: {
    marginTop: 20,
    whiteSpace: 'pre-line',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    width: '37.5%',
    fontSize: 14,
    marginRight: 20,
    '&:last-child': {
      marginRight: 0,
    },
  },
  dateInput: {
    width: '25%',
  },
  textAreaInput: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    fontSize: 12,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    color: 'red',
    paddingTop: 15,
    fontSize: 14,
  },
  idContainer: {
    borderBottom: '1px ​solid rgb(231, 234, 236)',
  },
  id: {
    marginLeft: 10,
  },
  uneditableContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    fontSize: 14,
    color: 'rgb(46, 63, 87)',
    padding: '0px 5px 0px 5px',
  },
  uneditableTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  documentListNameWrapper: {
    display: 'flex',
    alignItems: 'end',
    '& svg': {
      marginRight: '1rem',
      fontSize: 23,
    },
  },
  documentList: {
    listStyle: 'none',
    border: '1px solid #d3dee7',
    borderRadius: 3,
    marginBottom: '1rem',
    height: 'calc(100% - 280px)',
    overflowY: 'scroll',
    '& li': {
      padding: '1rem',
      fontSize: 14,
      backgroundColor: '#ecf0f5',
      cursor: 'pointer',
      borderBottom: '1px solid #d3dee7',
      color: '#2e3f57',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
    },
    '& li:last-child': {
      borderBottom: 'none',
    },
  },
  documentListDate: {
    color: 'rgba(46, 63, 87, 68%)',
  },
  draftedDocInputContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridRowGap: 10,
    padding: 15,
    alignItems: 'center',
    justifyItems: 'center',
  },
  ul: {
    listStyle: 'none',
    padding: '1rem',
    overflowY: 'scroll',
    height: '100%',
  },
  sectionWrapper: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  label: {
    color: 'rgb(46, 63, 87)',
    display: 'block',
    fontSize: 12,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  openButtonIcon: {
    fontSize: 15,
    marginRight: 6,
    marginTop: 11,
  },
  btnWrapper: {
    display: 'flex',
    '& > button:first-child': {
      marginRight: 20,
    }
  },
  documentsWrapper: {
    display: 'flex',
    margin: '0 15px',
    paddingBottom: 40,
  },
  details: {
    width: '100%',
    position: 'relative',
  },
  documents: {
    width: '25%',
  },
  close: {
    position: 'absolute',
    top: 10,
    cursor: 'pointer',
    zIndex: 9998,
    right: 25,
  },
  breadCrumbs: {
    marginLeft: "25px"
  }
}));
