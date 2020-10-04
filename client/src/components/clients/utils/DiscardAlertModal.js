import React, { Fragment, useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const DiscardAlertModal = ({ openAlert, setOpenAlert, handleDiscard }) => {
  return (
    <Fragment>
      <Dialog
        open={openAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Discard Changes?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDiscard()} color='primary'>
            Discard
          </Button>
          <Button onClick={() => setOpenAlert(false)} color='primary' autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DiscardAlertModal;
