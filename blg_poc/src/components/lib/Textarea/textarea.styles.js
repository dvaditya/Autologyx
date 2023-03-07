import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  textareaWrapper: {
    display: 'inline-block',
    marginBottom: 6,
    width: '100%',
  },
  textarea: {
    resize: 'vertical',
    border: '1px solid #d9d9d9',
    padding: 8,
    borderRadius: '3px',
    position: 'relative',
    display: 'inline-block',
    fontWeight: '400',
    backgroundImage: 'none',
    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
    fontSize: 13,
    color: '#222',
    background: '#fff',
    border: '1px solid #d9d9d9',
    padding: '8px',
    borderRadius: '2px',
    verticalAlign: '-1px',
    borderColor: '#d3dee7',
    width: 'calc(100% - 18px)',
    '&:focus': {
      boxShadow: '0 0 0 2px rgba(24,144,255,0.2)',
      borderColor: '#40a9ff',
    },
    '&:active' : {
      borderColor: 'blue'
    },
    whiteSpace: 'pre-wrap',
  },
  label: {
    display: 'block',
    fontSize: 12,
    color: 'rgb(46, 63, 87)',
    marginBottom: 4,
    marginLeft: 6,
  },
  fullWidth: {
    width: 'calc(100% - 8px)',
  },
  sidebar: {
    minHeight: 250,
    width: '100%',
  },
}));
