import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    summaryDisplay: {
        width: "100%"
    },
    breadCrumbs: {
        width: "100%",
        display: "flex",
        marginTop: "15px",
        marginBottom: "10px"
    },
    breadCrumb: {
        color: "grey",
        fontSize: "12px"
    },
    summaryPanel: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    summaryGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
        width: '100%'
    },
    fieldItem: {
        width: 'calc(50% - 50px)',
        margin: '2px 25px 2px 25px',
    },
    fieldLabel: {
        color: '#808080',
        fontWeight: 600,
        display: 'block',
        marginBottom: 5,
        marginLeft: "spx",
        textTransform: "capitalize",
        fontSize: "12px"
    },
    fieldValue: {

    },
    mainTitle: {
       // color: '#808080',
        color: '#0c8ce9',
        fontWeight: 700,
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
        marginTop: "10px"
    },
    deficiencyTitle: {
        color: '#0c8ce9',
    },
    deficiencyGroupContainer : {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginBottom: '10px'
    },
    deficiencyContainer: {
        display: 'flex',
    },
    textArea : {
        width: '97%',
        height: '75px',
        padding: '7px'
    }
}))