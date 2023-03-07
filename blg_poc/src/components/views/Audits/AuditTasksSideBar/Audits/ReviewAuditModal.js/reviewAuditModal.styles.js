import { makeStyles } from '@material-ui/core/styles';
import { composeP } from 'ramda';

export default makeStyles(() => ({
    content: {
        padding: '2rem 24px',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    downloadContainer: {
        width: "400px",
        margin: "30px",
        padding: "30px",
        border: "1px solid gray"
    },
    alertContainer : {
        width: "400px",
        margin: "0 30px",
    },
    downloadLink: {
        color: "gray",
        textDecoration: "none",
        "&:hover": {
            color: "dark-gray"
        }
    },
    dropzone: {
        width: "400px",
        margin: "30px",
        padding: "30px",
        border: "1px dashed gray",
        color: "gray"
    },
    newFile: {
        width: "400px",
        margin: "0 30px",
        padding: "0",
        "& h4": {
            textAlign: "left",
            color: "#2e2e2e"
        }
    },
    newFileItem: {
        color: "gray",
        margin: 0,
        padding: 0,
        textAlign: "left",
        fontSize: "11px"
    }
}));
