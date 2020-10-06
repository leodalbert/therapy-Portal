import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  submitClientNote,
  editNewNote,
  clearNewClientNote,
} from '../../actions/client';
import DeleteButtonModal from './utils/DeleteButtonModal';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogActions as MuiDialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DiscardAlertModal from './utils/DiscardAlertModal';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <i className='far fa-window-close'></i>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'space-between',
  },
}))(MuiDialogActions);

const EditNoteModal = ({
  note,
  newNote,
  editNewNote,
  submitClientNote,
  clearNewClientNote,
}) => {
  const latestNote = useRef('');
  useEffect(() => {
    latestNote.current = newNote;
  });

  //  Edit note modal state
  const [open, setOpen] = useState(false);

  // Discard changes alert modal state
  const [openAlert, setOpenAlert] = useState(false);

  // opens edit modal and populates redux 'editNewNote' state
  const handleClickOpen = () => {
    setOpen(true);
    editNewNote(note);
  };

  // close edit note modal - if unsaved changes, ask to discard
  const handleClose = () => {
    if (note.note !== latestNote.current.note) {
      return setOpenAlert(true);
    }
    clearNewClientNote();
    setOpen(false);
  };

  // discard unsaved changes
  const handleDiscard = () => {
    clearNewClientNote();
    setOpenAlert(false);
    setOpen(false);
  };

  // edit note in redux state
  const handleEditNewNote = (text) => {
    let noteObj = { ...latestNote.current, note: text };
    editNewNote(noteObj);
  };

  // save edited note
  const handleSave = () => {
    submitClientNote(latestNote.current, latestNote.current._client);
    setOpen(false);
  };
  return (
    <div className='blue-text'>
      <Button
        variant='text'
        color='inherit'
        style={{ marginTop: '10px' }}
        onClick={handleClickOpen}
      >
        <i className='fas fa-pen fa-lg'></i>
      </Button>
      <Dialog
        fullWidth
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Created on {moment(note.dateCreated).format('MMMM Do YYYY, h:mm a')}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id='standard-multiline-static'
            label='Note'
            multiline
            rowsMax={20}
            value={newNote.note}
            fullWidth
            onChange={(e) => handleEditNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <DeleteButtonModal className='left' id={note._id} />
          <Button autoFocus onClick={handleSave} color='primary'>
            Save changes
          </Button>
        </DialogActions>
        <DiscardAlertModal
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          handleDiscard={handleDiscard}
          text={'Discard Changes?'}
          confirmBtn='Discard'
          cancleBtn='Cancel'
        />
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newNote: state.clients.newNote,
});

export default connect(mapStateToProps, {
  editNewNote,
  submitClientNote,
  clearNewClientNote,
})(EditNoteModal);
