import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  clientContactsList: {
    // width: "600px",
    // margin: "10px",
    // padding: "10px",
    // maxHeight: "400px",
  },
  clientContact: {
    // border: "1px solid #EBEDEE",
    // padding: "5px",
    // marginBottom: "5px",
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '10px',
    borderBottom: "1px solid #EBEDEE",
    fontSize: "14px",
    fontWeight: "400",
    /*width: "100%"*/
  },
  clientContactContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  clientContactFieldLabel: {
    fontWeight: "600",
    color: "#2e3f57",
    width: "220px"
  },
  clientContactRow: {
    // display: "flex",
    flexDirection: "row",
    justifyItems: "space-between",
    width: "100%",
    //minHeight: "30px",
    marginBottom: "7px"
  },
  clientContactRowModal: {
    marginBottom: '17px',
  },
  clientContactRowSwitchButtonsModal: {
    marginLeft: '10px'
  },
  "MuiIconButton-root": {
    padding: "none !important"
  },
  actionButton: {
    background: '#fff',
    border: 'none',
    fontWeight: 'bold',
    display: 'flex',
    padding: '0px',
    fontSize: 15,
    alignItems: 'center',
    fontWeight: 'bold',
    height: 30,
    cursor: 'pointer',
    color: '#2f2f2fba',
    "&:disabled": {
      color: "lightgrey"
    }
  },
  resetAuditLink: {
    background: '#fff',
    border: 'none',
    fontWeight: 'bold',
    display: 'flex',
    padding: '0px',
    fontSize: 15,
    alignItems: 'center',
    fontWeight: 'bold',
    height: 30,
    color: '#0c8ce9;',
    cursor: 'pointer',
    "&:disabled": {
      color: "lightgrey"
    }
    
  },
  actionButtonIcon: {
    fontSize: 20,
    cursor: 'pointer',
    
  },
  errorMessageContainer: {
    color: "red",
    display: "flex",
    flexDirection: "row-reverse"
  },
  email: {
    color: '#0c8ce9',
    fontWeight: '700'
  },
  label: {
    fontSize:'0.7em'
  },
  formSwitch: {
    margin: '3px 7px 4px 10px'
},
emailAnchor: {
  textDecoration: 'none',
  color: '#0c8ce9',
  cursor: 'pointer'
}
}));
