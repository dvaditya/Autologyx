import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";

export default () => {
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const handleClose = (id: string) => () => {
        dispatch({
            type: "REMOVE_ALERT",
            payload: id
        })
    }
    return <>
        {
            state.alerts.map((alert) => {
                return <Snackbar open={true} autoHideDuration={6000} onClose={handleClose(alert.id)}>
                    <Alert onClose={handleClose(alert.id)} severity={alert.severity as AlertColor} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            })
        }
    </>
}