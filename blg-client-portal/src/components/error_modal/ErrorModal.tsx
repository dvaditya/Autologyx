import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { SyntheticEvent } from 'react';

export default ({open, message}: {open: boolean, message: string}) => {
    const handleReloadClicked = (e: SyntheticEvent) => {
        e.preventDefault()
        window.location.reload()
    }
    return <Dialog
        open={open}
        onClose={() => false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"An error has occured"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReloadClicked}>Refresh</Button>
        </DialogActions>
      </Dialog>
}