import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  ul: {
    marginTop: 10,
    listStyle: 'none',
    textAlign: 'center',
    fontSize: '14px',
    color: '#2e3f57',
    width: '100%',
    overflowY: 'scroll',
    '& li': {
      display: 'flex',
      alignItems: 'flex-start',
    },
    '& li svg': {
      fontSize: 30,
      marginRight: '0.7rem',
    },
  },
  nameSection: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0 2px',
  },
  nameWrapper: {
    display: 'flex',
  },
  label: {
    fontWeight: 400,
    marginRight: '0.7rem',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  fileImg: {
    fontSize: "30px",
  },
  orange: {
   color:  "orange"
  },
  red: {
    color:  "red"
   },
   grey: {
    color:  "grey"
   },
   blue: {
    color:  "blue"
   },
   green: {
    color:  "green"
   },
   fileListContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 25px",
    maxHeight: "150px",
    marginTop: "20px",
    overflowY: "auto",
   },
   fileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
   },
   fileContents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    //text-align: left;
    padding: "5px",
    //width: 100%;
   },
   fileNameContents: {
    fontSize: "14px",
    alignItems: "center",
    marginLeft: "25px",
   },
   fileName: {
     textDecoration: "underline"
   },
   fileDelete: {
    cursor: "pointer",
  },
  docIcon: {
    width: 40,
    height: 40,
  },
}));
