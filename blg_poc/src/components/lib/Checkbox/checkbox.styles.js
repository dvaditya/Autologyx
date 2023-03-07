import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    color: 'rgb(46, 63, 87)',
    fontSize: 12,
  },
}));
