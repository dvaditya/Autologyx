import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  header: {
    backgroundColor: '#fff',
    color: '#2e3f57',
    padding: '14px 10px',
    fontSize: 15,
    fontWeight: 700,
    // height: 28,
    lineHeight: '28px',
    // borderBottom: '2px solid #EBEDEE',
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
    //borderBottom: '2px solid #EBEDEE',
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
    padding: "5px 24px"
  },
  footer: {
    borderTop: '2px solid #EBEDEE',
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "14px 24px"

  }
  
}));
