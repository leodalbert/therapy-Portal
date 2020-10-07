import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { DateTimePicker } from '@material-ui/pickers';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';

import { addAppt } from '../../actions/appts';
import { setAlert } from '../../actions/alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    minWidth: '90%',
  },
}));

const AddApptModal = ({ addAppt, setAlert, isOpen, handleClose, clients }) => {
  const classes = useStyles();
  const [date, setDate] = useState(
    //   rounded to 15 minutes
    moment().add(15 - (moment().minute() % 30), 'minutes')
  );
  const [client, setClient] = useState('');
  const [length, setLength] = useState(45);
  const [note, setNote] = useState('');
  console.log(client);

  const onSubmit = () => {
    const newAppt = {
      title: client,
      start: date,
      end: moment(date).add(length, 'm'),
      note,
    };

    addAppt(newAppt);

    setAlert(
      `Added appointment for ${client} on ${moment(date).format(
        'dddd, MMMM Do [at] h:mm a'
      )}`,
      'alert-success'
    );

    //Clear fields
    setClient('');
    setLength(45);
    setNote('');
    setDate(moment().add(15 - (moment().minute() % 30), 'minutes'));
  };
  return (
    <Dialog
      maxWidth='sm'
      open={isOpen}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby='max-width-dialog-title'
    >
      <DialogTitle>
        <div>
          <h5 className='grey-text text-darken-1'>Add New Appointment</h5>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='col s12'>
          <div className='row'>
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
                      <MenuItem key={client._id} value={client._id}>
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
    </Dialog>
  );
};

AddApptModal.prototypes = {
  addAppt: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
});
export default connect(mapStateToProps, { addAppt, setAlert })(AddApptModal);

// <div className='row'>
// <div className='col s6 '>
//   <div className='input-field modal-margin'>
//     <select
//       name='Select Client'
//       value={client}
//       onChange={(e) => setClient(e.target.value)}
//       className='browser-default'
//     >
//       <option value='' disabled={true}>
//         Select Client
//       </option>
//       <ClientSelector />
//     </select>
//   </div>

//   <div className='input-fields'>
//     <select
//       name='length'
//       value={length}
//       onChange={(e) => setLength(e.target.value)}
//     >
//       <option value='' disabled>
//         Select length of session
//       </option>
//       <option value={30}>30 min</option>
//       <option value={45}>45 min</option>
//       <option value={60}>60 min</option>
//     </select>
//     <label>Length</label>
//   </div>

//   <div className='input-field'>
//     <input
//       type='text'
//       name='note'
//       value={note}
//       onChange={(e) => setNote(e.target.value)}
//     />
//     <label htmlFor='note' className='active'>
//       Note
//     </label>
//   </div>
//   <div className='modal-footer'>
//     <a
//       disabled={!client}
//       href='#!'
//       onClick={onSubmit}
//       className='modal-close waves-effect blue waves-light btn-large'
//     >
//       Create
//     </a>
//   </div>
// </div>

// <div className='myContainer col s6'>
//   <DateTimePicker
//     className='myDatePicker'
//     variant='static'
//     label='LightBlue DateTimePicker'
//     value={date}
//     onChange={setDate}
//     animateYearScrolling
//     disablePast='true'
//     minutesStep={5}
//     box-sizing='border-box'
//   />
// </div>
// </div>
