import { Alert as MuiAlert, Snackbar } from "@mui/material";
import React, { forwardRef, useState } from "react";

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
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} 
            anchorOrigin={{vertical:'top', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    )
}

// Usage: 
    // const { showAlert, BasicAlert } = useBasicAlert(initialSeverity) at top of function
    // in component: <BasicAlert /> somewhere
    // showAlert(message, severity?) wherever needed
// https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh
export function useBasicAlert(initialSeverity) {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState(initialSeverity);
    const [msg, setMsg] = useState("");

    // document.addEventListener('keypress', (e) => {
    //     setOpen(false);
    // });

    function showAlert(newMsg, newSeverity) {
        setMsg(newMsg);
        setOpen(true);
        if (newSeverity) {
            setSeverity(newSeverity);
        }
    }

    
    return {
        showAlert,
        // a functional component is just a function returning a JSX element -> we can set props immediately
        BasicAlert: () => <BasicAlert message={msg} severity={severity} open={open} setOpen={setOpen} />,
        setOpen
    };
}