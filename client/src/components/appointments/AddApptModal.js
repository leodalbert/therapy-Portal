import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';

import { addAppt } from '../../actions/appts';
import { setAlert } from '../../actions/alert';
import DiscardAlertModal from '../clients/utils/DiscardAlertModal';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    minWidth: '90%',
  },
}));

const AddApptModal = ({
  addAppt,
  setAlert,
  isOpen,
  handleClose,
  clients,
  setOpenModal,
}) => {
  const classes = useStyles();
  // Discard changes alert modal state
  const [openAlert, setOpenAlert] = useState(false);
  const [date, setDate] = useState(
    //   rounded to 15 minutes
    moment().add(15 - (moment().minute() % 30), 'minutes')
  );
  const [client, setClient] = useState('');
  const [length, setLength] = useState(45);
  const [note, setNote] = useState('');

  //   Clear fields
  const clearFields = () => {
    setClient('');
    setLength(45);
    setNote('');
    setDate(moment().add(15 - (moment().minute() % 30), 'minutes'));
  };

  // discard unsaved changes
  const handleDiscard = () => {
    setOpenAlert(false);
    clearFields();
    setOpenModal(false);
  };

  const handleSubmit = () => {
    const newAppt = {
      title: client,
      start: date.toISOString(),
      end: moment(date).add(length, 'm').toISOString(),
      note,
    };

    addAppt(newAppt);

    setAlert(
      `Added appointment for ${client} on ${moment(date).format(
        'dddd, MMMM Do [at] h:mm a'
      )}`,
      'alert-success'
    );

    clearFields();
    setOpenModal(false);
  };
  return (
    <Dialog
      maxWidth='sm'
      open={isOpen}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby='max-width-dialog-title'
      onBackdropClick={() => setOpenAlert(true)}
      disableEscapeKeyDown={true}
    >
      <DialogTitle>
        <div>
          <h5 className='grey-text text-darken-1'>Schedule Appointment</h5>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='col s12'>
          <div className='row' style={{ marginBottom: '0px' }}>
            <div className='col s5'>
              <FormControl className={classes.formControl}>
                <InputLabel id='clientSelectorLabel'>Client</InputLabel>
                <Select
                  labelId='clientSelector'
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                >
                  {clients
                    .filter((client) => !client.archived)
                    .map((client) => (
                      <MenuItem key={client._id} value={client.name}>
                        {client.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id='timeSelectorLabel'>
                  Select length of session
                </InputLabel>
                <Select
                  name='length'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <MenuItem value={30}>30 min</MenuItem>
                  <MenuItem value={45}>45 min</MenuItem>
                  <MenuItem value={60}>60 min</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                  label='Note'
                  name='note'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </FormControl>
            </div>
            <div className='col s7'>
              <DateTimePicker
                className='myDatePicker'
                variant='static'
                label='LightBlue DateTimePicker'
                value={date}
                onChange={setDate}
                animateYearScrolling
                disablePast='true'
                minutesStep={5}
                box-sizing='border-box'
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          disabled={!client}
          onClick={() => handleSubmit()}
        >
          Schedule
        </Button>
      </DialogActions>
      <DiscardAlertModal
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDiscard={handleDiscard}
        text={'Discard Appointment?'}
        confirmBtn='Discard'
        cancleBtn='Cancel'
      />
    </Dialog>
  );
};

AddApptModal.prototypes = {
  addAppt: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
});
export default connect(mapStateToProps, { addAppt, setAlert })(AddApptModal);
