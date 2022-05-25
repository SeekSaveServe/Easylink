import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { forwardRef, useState } from "react";

const Alert = forwardRef(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// severity: success || warning || error || info
// open, setOpen: state from useBasicAlert hook or any other desired
export function BasicAlert({ message, severity, open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{vertical:'top', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    )
}

// Usage: 
    // const { open, setOpen, severity, setSeverity, BasicAlert } = useBasicAlert(initialSeverity) at top of function
    // in component: <BasicAlert open={open} setOpen={setOpen} severity={severity}/>
// https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh
export function useBasicAlert(initialSeverity) {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState(initialSeverity);
    
    return {
        open,
        setOpen,
        severity,
        setSeverity,
        BasicAlert
    };
}