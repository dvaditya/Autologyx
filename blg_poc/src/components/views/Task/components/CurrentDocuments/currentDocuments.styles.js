import { makeStyles } from '@material-ui/core/styles';
import { Transform } from '@material-ui/icons';

export default makeStyles(() => ({
  wrapper: {
    border: '1.5px solid rgb(211, 222, 231)',
    padding: '0px 15px 15px 15px',
    margin: '0px 15px 0 15px',
   height: '68.7vh',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll'
  },
  docIcon: {
    width: 40,
    height: 40,
  },
  documentsWrapper: {
    height: '100%',
    display: 'flex',
    flex: '0 1 80px',
    flexDirection: 'column',
    
  },
  pdfImage: {
    height: 50,
  },
  icons: {
    display: 'none',
  },
  icon: {
    fontSize: 17,
    marginRight: 5,
    
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 50
  },
  document: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    width: '100%',
    textDecoration: 'none !important',
    '&:first-child': {
      marginTop: 0,
    },
  },
  documentTitle: {
    fontSize: 13,
    marginTop: 2,
    marginLeft: 15,
    display: 'block',
  },
  documentName: {
    textDecoration: 'underline'
  },
  uploadButton: {
    borderRadius: 5,
    border: 'none',
    height: 33,
    width: 110,
    fontSize: 18,
    fontWeight: 'thin',
    margin: '0 0 25px 0',
    cursor: 'pointer',
    background: '#002c5f',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  documentWrapper: {
    position: 'relative',
  },
  deleteIcon: {
    cursor: 'pointer',
    /*position: 'absolute',
    right: 45,
    bottom: 40,*/
    width: 20,
    height: 20,
  },
  docsWrapper: {
    // display: 'fllex',
    position: 'relative',
    width: '100%',
    borderBottom:  '1.5px solid rgb(211, 222, 231)',
    paddingTop: '10px',
    paddingLeft: '5px',
    '&:hover': {
      backgroundColor: '#ededed'
    }
  },
  fileImg: {
    fontSize: "30px",
  },
  orange: {
    color: "orange"
  },
  red: {
    color: "red"
  },
  grey: {
    color: "grey"
  },
  blue: {
    color: "blue"
  },
  green: {
    color: "green"
  },
  breadCrumbs: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginTop: '20px',
    marginBottom: '40px'
  },
  lastBreadcrumb: {
    fontWeight: '700'
  },
  breadCrumb: {
    whiteSpace: "nowrap",
    color: "grey",
    fontSize: "10px"
  },
  docActions: {
    width: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    position: 'absolute',
    right: 45,
    bottom: 25,
  },
  fileDelete: {
    cursor: "pointer",
    marginRight: "30px"
  }

}));
