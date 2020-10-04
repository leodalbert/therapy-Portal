import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

import { deleteNote } from '../../../actions/client';

const DeleteButtonModal = ({ id, deleteNote }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteNote(id);
    handleClose();
  };

  return (
    <Fragment>
      <Button
        className='red-text'
        variant='text'
        color='inherit'
        onClick={handleClickOpen}
      >
        <i className='fas fa-trash fa-lg'></i>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Note?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { deleteNote })(DeleteButtonModal);
