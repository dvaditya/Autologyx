import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  
  row: {
    padding: 25,
    flex: .5,
  },
  form: {
    /*flex: 0.75,*/
    display: 'flex',
    alignContent: "flex-start",
    flexWrap: 'wrap',
    '& > *': {
      width: 'calc(50% - 50px)',
      margin: '2px 25px 2px 25px',
    },
    overflowY: "auto",
    height: "70vh",
    width: "60%",
    border: 'solid 1.5px rgb(231, 234, 236)',
    marginLeft: '15px'
  },
  btnWrapper: {
    display: 'flex',
    width: '75%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 99,
    height: 50,
    background: 'white',
    alignItems: 'center',

    '& > button:first-child': {
      marginRight: 15,
      marginLeft: 'auto',
    }
  },
  summary: {
    width: '100%',

    '& > textarea': {
      minHeight: '100px' ,
    }
  },
  summaryTitle: {
    color: '#808080',
    fontWeight: 600,
    marginLeft: 5,
    display: 'block',
    marginBottom: 5,
    textTransform: "capitalize",
    fontSize: "12px"
  },
  checkboxGroup: {
    display: 'flex',
    marginBottom: 5,
    alignItems: 'center',
    '& > div > span': {
      padding: 0,
    }
  },
  breadCrumbs: {
    width: "100%",
    display: "flex",
    marginTop: '20px',
    marginBottom: '40px'
  },
  breadCrumb: {
    color: "grey",
    fontSize: "12px"
  },
  textArea: {
    width: "calc(100% - 1rem)",
    resize: "vertical",
    borderRadius: "3px",
    position: "relative",
    display: "inline-block",
    fontWeight: '400',
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.015)",
    fontSize: "13px",
    color: "#222",
    border: "1px solid #d9d9d",
    padding: "8px",
    borderColor: "#d3dee7"
  },
  checkAndTextText: {
    marginTop: "5px"
  },
  groupTitle: {
    color: '#808080',
    fontWeight: 600,
    marginLeft: 5,
    display: 'block',
    marginBottom: 5,
    marginTop: "10px",
    fontSize: '12px'
  },
  grouping: {
    '& > *': {
      // marginTop: "10px",
      marginBottom: "5px"
    }
  },
  sectionHeader: {
    backgroundColor: '#002c5f',
    color: 'white',
    width: "100%",
    fontWeight: 700,
    marginLeft: 25,
    display: 'block',
    marginBottom: 5,
    textTransform: "uppercase",
    marginTop: "10px",
    padding: '7px 15px',
    fontSize: '14px'
  },
  formTabs: {
    width: "100%",
    display: "flex",
    borderBottom: '1.5px solid rgb(231, 234, 236)',
    marginBottom: '40px'
  },
  noFormSelected: {
    width: "100%",
    textAlign: "center",
    color: '#808080',
    fontWeight: 700,
    fontSize: "32px"
  },
  lastPath: {
    fontWeight: 700,
  },
  groupingContainer: {
    marginBottom: '30px'
  }
}));

//color: #808080;
//     display: block;
//     font-weight: 600;
//     margin-left: 5px;
// }
