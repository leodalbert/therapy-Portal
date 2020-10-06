import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const AddClientBtn = ({ setOpenModal }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: blue,
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        className='blue'
        aria-label='addClient'
        onClick={() => setOpenModal(true)}
      >
        <i className='material-icons white-text'>person_add</i>
      </Fab>
    </div>
  );
};

export default AddClientBtn;
