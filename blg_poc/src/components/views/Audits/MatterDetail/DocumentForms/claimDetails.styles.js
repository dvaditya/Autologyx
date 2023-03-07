import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  claimItemContainer: {
    width: 400
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
});
