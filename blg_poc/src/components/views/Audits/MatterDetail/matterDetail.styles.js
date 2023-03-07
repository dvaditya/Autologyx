import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTop: '1px solid #D3DEE7',
    borderLeft: '1px solid #D3DEE7',
    display: 'flex',
  },
  closeBar: {
    width: 28,
    height: '100%',
    borderRight: '1px solid #d3dee7',
    backgroundColor: '#e2e7ec',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#2e3f57',
    cursor: 'pointer',
    height: 32,
    '&:hover': {
      backgroundColor: '#eff6fd',
    },
  },
  closeIcon: {
    width: 17,
  },
  hideIcon: {
    width: 13,
    right: 1,
    position: 'relative',
  },
  detailWrapper: {
    width: 'calc(75% - 29px)',
  },
  detailHeader: {
    color: '#2e3f57',
    fontWeight: 700,
    fontSize: 19,
    display: 'flex',
    alignItems: 'baseline',
  },
  statusSelect: {
    position: 'relative',
    bottom: 4,
  },
  detailNavWrapper: {
    display: 'flex',
    alignItems: 'baseline',
  },
  spaceFiller: {
    height: 200,
  },
  detailSummaryWrapper: {
    width: '50%',
  },
  summaryWrapper: {
    display: 'flex',
    padding: '15px',
  },
  detailWrapperContained: {
    width: 'calc(100% - 50px)',
  },
  contactInputs: {
    marginRight: 6,
    width: 300,
    maxWidth: 'calc(calc(100% / 3) - 12px)',
  },
  sectionWrapper: {
    border: '1px solid #d3dee7',
    marginBottom: '1rem',
    marginTop: '1rem',
  },

  tabWrapper: {
    display: 'flex',
    fontSize: 14,
    marginLeft: '3rem',
    position: 'relative',
    bottom: '-1px',
  },
  tab: {
    padding: '0 15px 15px 15px',
    minWidth: '140px',
    color: '#2e3f57',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'center',
  },
  activeTab: {
    borderBottom: '3px solid #028FDF',
    color: '#028FDF',
  },
}));
