import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  inputWrapper: {
    display: 'inline-block',
    marginBottom: 6,
  },
  input: {
    border: '1px solid #d9d9d9',
    padding: 8,
    height: 15,
    borderRadius: '3px',
    position: 'relative',
    display: 'inline-block',
    fontWeight: '400',
    whiteSpace: 'nowrap',
    backgroundImage: 'none',
    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
    fontSize: '14px',
    color: '#222',
    background: '#fff',
    padding: '8px',
    borderRadius: '2px',
    verticalAlign: '-1px',
    borderColor: '#d3dee7',
    '&:focus': {
      boxShadow: '0 0 0 2px rgba(24,144,255,0.2)',
      borderColor: '#40a9ff',
    },
    '&:disabled': {
      backgroundColor: '#ebeff3',
      cursor: 'not-allowed',
    },
    width: 'calc(100% - 18px)',
  },
  date: {
    fontSize: 13,
    padding: '6px 4px !important',
  },
  label: {
    display: 'block',
    fontSize: 12,
    color: 'rgb(46, 63, 87)',
    marginBottom: 4,
    marginLeft: 6,
  },
  fullWidthWrapper: {
    width: 'calc(100% - 16px)',
  },
  fullWidth: {
    width: '100%',
    height: '100%',
  },
  inputInnerWrapper: {
    position: 'relative',
    '& svg': {
      color: '#a9b6c1',
      fontSize: '20px',
      padding: '0 9px',
      cursor: 'pointer',
    },
  },
  displayButton: {
    position: 'absolute',
    top: '-6px',
    right: '0',
    backgroundColor: 'transparent',
    border: 'none',
    height: 'calc(100% + 14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passInput: {
    background: 'none !important',
  },
  error: {
    color: "red",
    fontSize: "11px"
  }
}));
