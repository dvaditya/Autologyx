import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    content: {
        padding: '2rem 24px',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between'
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
}));
