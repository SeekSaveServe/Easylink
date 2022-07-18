import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Stack } from '@mui/material';
import { Center } from '@chakra-ui/react';
// title, description, disagreeText, agreeText: String
    // disagree/agreeText for buttons
// agreeAction: function to run if user agrees
export function AlertDialog({ title, description, disagreeText, agreeText, agreeAction, open, setOpen }) {

  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async() => {
    setLoading(true);
    await agreeAction();
    setLoading(false);
    handleClose();

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            position: "absolute",
            left:"0%",
            top:"-60%"
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Center>
          <Stack direction="row" spacing={5}>
            { loading ? <></> : <Button onClick={handleClose}>{disagreeText}</Button> }
            <LoadingButton loading={loading} onClick={handleAgree} color="error"autoFocus>
                {agreeText}
            </LoadingButton>
          </Stack>
          </Center>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function useAlertDialog() {
    const [open, setOpen] = React.useState(false);
    const openDialog = () => setOpen(true);

    const CurriedAlertDialog = (props) => <AlertDialog open={open} setOpen={setOpen} {...props}/>

    return {
        openDialog,
        AlertDialog: CurriedAlertDialog
    }
}