import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  pageContent: {
    width: 'calc(100% - 30px)',
    padding: 15,
  },
  formWrapper: {
    border: '1px solid #d3dee7',
    marginTop: '1.3rem',
  },
  spaceFiller: {
    height: 200,
  },
  detailSummaryWrapper: {
    width: '70%',
  },
  summaryWrapper: {
    display: 'flex',
    padding: '15px',
  },
  detailWrapperContained: {
    width: 'calc(100% - 50px)',
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  claimDetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  claimDetail: {
    padding: '1rem',
  },
  contactSelects: {
    marginRight: 6,
    width: '30%',
    marginBottom: 4,
  },
  contactInputs: {
    marginRight: 6,
    width: 300,
    maxWidth: 'calc(calc(100% / 3) - 12px)',
    marginTop: 21,
  },
  emailInputs: {
    marginRight: 6,
    width: 300,
    maxWidth: 'calc(calc(calc(100% / 3) * 2) - 44px)',
    marginTop: 21,
  },
  detailInputs: {
    marginRight: 6,
    width: 'calc(calc(100% / 2) - 12px)',
  },
  detailSelects: {
    marginRight: 6,
    width: 300,
    maxWidth: 'calc(calc(100% / 2) - 12px)',
    marginBottom: 7,
  },
  select: {
    height: 20,
  },
  claimValueWrapper: {
    display: 'flex',
  },
  emailButton: {
    display: 'inline',
    marginTop: 4,
    borderRadius: 3,
    padding: '5px 8px 2px 8px',
    height: 'auto',
  },
  emailButtonIcon: {
    fontSize: 18,
  },
  addClaimButton: {
    marginTop: '1rem',
    float: 'right',
  },
  inputWrapperStyles: {
    width: 'calc(calc(100% / 3) - 10px)',
    marginRight: 35,
  },
  inputCell: {
    width: "calc(50% - 10px)"
  }
});
