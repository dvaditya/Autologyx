import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  detailsWrapper: {
    // display: 'flex',
    marginBottom: 40,
    marginTop: 15,
    // padding: '0 15px',
    // alignItems: 'center',
  },
  details: {
    display: 'flex',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 25px',
  },
  title: {
    width: '30%',
    fontSize: 18,
  },
  detailTitle: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 5,
  },
  name: {
    marginBottom: 0,
    position: 'relative',
  },
  email: {
    // position: 'relative',
    // bottom: 4,
  },
  keyHeader : {
    color: '#002c5f',
    marginBottom: '10px'
  },
  infoIcon : {
    marginLeft: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    padding: '5px 17px 10px 0',
    
  },
  popOverContentContainer : {
    padding: '15px',
    color: 'grey',
    width: '30vw'
  },
  popoverItem : {
    padding: '5px',
    marginBottom: '5px',
    borderRadius: '12px',
    '&:hover' : {
      backgroundColor : 'rgba(96, 96, 96, 0.22);'
    }
  },
  popoverItemSubText : {
    fontSize: '10px'
  },
  selectedFileIconExample: {
    borderRadius: '50%',
    padding: '5px',
    backgroundColor : 'rgba(96, 96, 96, 0.22);',
    marginRight: '5px'
  }
}));
