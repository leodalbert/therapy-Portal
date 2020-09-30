import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  reminders: {
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

let Reminders = ({ edit, reminders, change }) => {
  const classes = useStyles();
  const [rem, setRem] = useState('');

  const handleDelete = (r) => {
    let newRems = reminders.filter((e) => e !== r);
    console.log(newRems);
    change('nextApptReminders', newRems);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let addReminder = reminders;
    addReminder.unshift(rem);
    change('nextApptReminders', addReminder);
    setRem('');
  };

  return (
    <form onSubmit={(e) => handleAdd(e)} style={{ marginTop: '30px' }}>
      {edit && (
        <div className='input-field col s12'>
          <input
            id='nextApptReminders'
            type='text'
            placeholder={`Add Reminder..`}
            onChange={(e) => setRem(e.target.value)}
            value={rem}
          />
        </div>
      )}
      <div className='grey-text text-darken-2'>
        <strong> Reminders for next session: </strong>
        {reminders.length > 0 ? (
          <div className={classes.reminders}>
            <List dense>
              {reminders.map((reminder) => {
                return (
                  <div key={reminder}>
                    <ListItem>
                      <ListItemText primary={reminder} />

                      <ListItemSecondaryAction>
                        {edit && (
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => handleDelete(reminder)}
                          >
                            <i className='material-icons'>delete</i>
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component='li' />
                  </div>
                );
              })}
            </List>
          </div>
        ) : (
          <p>No reminders to show!</p>
        )}
      </div>
    </form>
  );
};

Reminders.propTypes = {};

Reminders = reduxForm({
  destroyOnUnmount: false,
  form: 'editClientForm',
})(Reminders);

const selector = formValueSelector('editClientForm');

const mapStateToProps = (state) => ({
  reminders: selector(state, 'nextApptReminders'),
});
const mapDispatchToProps = {
  change,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
