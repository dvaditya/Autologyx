import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  genDocRoot: {
    padding: '0 1rem',
  },
  formItem: {
    marginTop: 20,
    '&:p': {
      display: 'flex',
    },
  },
  claimItemContainer: {
    marginRight: '20%',
  },
  claimItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    marginBottom: '0.6rem',
  },
  claimItemTitle: {
    fontWeight: 600,
  },
  detailHeader: {
    borderBottom: '1px solid black',
    marginBottom: 15,
  },
  topBar: {
    display: 'flex',
    padding: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  claimTitle: {
    color: '#2e3f57',
    fontSize: 25,
    fontWeight: '700 !important',
    lineHeight: 1.35,
    whiteSpace: 'nowrap',
  },
  hr: {
    width: '100%',
    border: 0,
    height: 0,
    margin: '0 auto 1rem 0',
    borderTop: '1px solid rgb(211 222 231)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  },
  metaDataWrapper: {
    display: 'flex',
    '& div': {
      fontSize: 14,
      marginLeft: '2rem',
    },
  },
  label: {
    color: 'rgb(46, 63, 87)',
    display: 'flex',
    fontSize: 12,
    marginBottom: 10,
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  paragraph: {
    marginBottom: '0.7rem',
    fontSize: '0.9rem',
  },
  sectionWrapper: {
    marginBottom: '1rem',
  },
  selectWrapper: {
    width: 320,
  },
  syncRelativityBtn: {
    marginBottom: 10,
  },
});
