import React, { Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const DiscardAlertModal = ({
  openAlert,
  setOpenAlert,
  handleDiscard,
  text,
  confirmBtn,
  cancleBtn,
}) => {
  return (
    <Fragment>
      <Dialog
        open={openAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{text}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDiscard()} color='primary'>
            {confirmBtn}
          </Button>
          <Button onClick={() => setOpenAlert(false)} color='primary' autoFocus>
            {cancleBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DiscardAlertModal;
