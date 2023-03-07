import { makeStyles } from '@material-ui/core/styles';
const cell = {
  margin: '0',
  padding: '0.5rem 1rem',
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:last-child': {
    borderRight: 0,
  },
  '&.isResizing': {
    background: 'red',
  },
  color: 'rgb(46, 63, 87)',
  fontSize: 13,
};

export default makeStyles(() => ({
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    display: 'inline-block',
    borderSpacing: '0',
  },
  detailRow: {
    backgroundColor: '#fff',
    border: '1px solid #F8F9FA',
  },
  tr: {
    '&:last-child td': {
      borderBottom: 0,
    },
    '&:nth-child(odd)': {
      backgroundColor: '#F8F9FA',
    },
  },
  activeTr: {
    backgroundColor: '#e1effb',
    '&:nth-child(odd)': {
      backgroundColor: '#e1effb',
    },
  },
  th: {
    ...cell,
    backgroundColor: 'rgb(234, 237, 239)',
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  notClickable: {
    cursor: 'default !important'
  },
  td: cell,
  resizer: {
    display: 'inline-block',
    background: 'rgb(206, 213, 218)',
    width: 4,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translateX(50%)',
    zIndex: 0,
    touchAction: 'none',
  },
  thOrderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  ordering: {
    display: 'flex',
    marginLeft: 10,
    flexDirection: 'column',
  },
  activeOrdering: {
    color: 'rgb(2, 143, 223)',
  },
  topOrder: {
    transform: 'rotate(180deg)',
    marginBottom: 3,
  },
  total: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 15,
  },
  perPage: {
    marginLeft: 24,
    color: 'rgb(88, 108, 147)',
    fontSize: 14,
    alignItems: 'center',
  },
  perPageLabel: {
    display: 'block',
    minWidth: 66,
  },
  pageCount: {
    color: 'rgb(88, 108, 147)',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    margin: '0 30px',
  },
  flexy: {
    display: 'flex',
  },
}));
