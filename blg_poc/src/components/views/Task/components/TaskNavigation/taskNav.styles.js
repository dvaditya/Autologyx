import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sideBarItem: {
    // width: 'calc(100% - 50px)',
    padding: '15px 10px 15px 25px',
    fontWeight: 300,
    cursor: 'pointer',
    '&:hover': {
      color: '#FFFFFF',
      background: '#002C5F',
      cursor: 'pointer',
    },
    '&:last-child': {
      //backgroundColor: 'red'
    },
  },
  formTabs: {
    display: "flex",
    marginBottom: '40px'
  },
  sideBarTabItem: {
    padding: '15px 0px 15px 0',
    marginRight: '25px',
    fontWeight: 300,
    cursor: 'pointer',
    marginTop: "3px",
    transition: 'all 0.15s ease-in',
    color: '#808080'
  },
  active: {
    borderLeft: '2px solid #002c5f',
    transition: 'border-left .3s ease',
    backgroundColor: '#d1d1d169'
  },
  activeText: {
    color: '#0c8ce9',
    fontWeight: '700'
  },
  activeTab: {
    fontWeight: 600,
    borderBottom : '2px solid #002c5f',
    color: '#808080'
  },
  sidebar: {
    flex: .25,
  },
  uploadButton: {
    borderRadius: 10,
    border: 'none',
    height: 40,
    width: 110,
    fontSize: 18,
    fontWeight: 'thin',
    margin: '10px 25px',
    cursor: 'pointer',
    background: '#607c9f',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  iconButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    padding: '5px'
    },
    currentPath: {
      backgroundColor : 'rgba(96, 96, 96, 0.22)',
      borderRadius: '50%'
    }
}));
