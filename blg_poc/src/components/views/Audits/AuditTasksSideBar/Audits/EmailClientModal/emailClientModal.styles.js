import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  header: {
    backgroundColor: '#fff',
    color: '#2e3f57',
    padding: '14px 24px',
    fontSize: 15,
    fontWeight: 600,
    height: 28,
    lineHeight: '28px',
    borderBottom: '2px solid #EBEDEE',
  },
  footer: {
    padding: '14px 24px',
    height: 40,
  },
  secondaryModalHeader: {
    backgroundColor: '#fff',
    color: '#2e3f57',
    padding: '14px 24px',
    fontSize: 15,
    fontWeight: 600,
    height: 28,
    lineHeight: '28px',
    borderBottom: '2px solid #EBEDEE',
    width: "400px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyTitle: {
    padding: "5px",
    fontSize: 12,
  },
  body: {
    padding: "5px"
  },
  footer: {
    borderTop: '2px solid #EBEDEE',
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px"

  },
  clientContactsList: {
    width: "600px",
    margin: "10px",
    padding: "10px",
    maxHeight: "400px",
    overflowY: "scroll"
  },
  clientContact: {
    border: "1px solid #EBEDEE",
    padding: "5px",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "400",
    /*width: "100%"*/
  },
  clientContactFieldLabel: {
    fontWeight: "600",
    color: "#2e3f57",
    width: "220px"
  },
  clientContactRow: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "space-between",
    width: "100%",
    minHeight: "30px",
    marginBottom: "7px"
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
    color: 'gray',
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
  fieldError: {
    color: "red",
    fontSize: "11px"
  }
  
}));
