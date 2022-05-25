import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { forwardRef, useState } from "react";

const Alert = forwardRef(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BasicAlert({ open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
            </Alert>
        </Snackbar>
    )
}

function useBasicAlert() {
    const [open, setOpen] = useState(false);
    
    return {
        open,
        setOpen,
        BasicAlert
    };
}



// function Alert() {
//     return (
//         <Snackbar open>
            
//         </Snackbar>
//     )
// }