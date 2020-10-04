import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { editClient } from '../../../actions/client';

const EditButton = ({ dispatch, edit }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const handleClick = () => {
    if (!edit) {
      dispatch(editClient(true));
    } else {
      dispatch(submit('editClientForm'));
      dispatch(editClient(false));
    }
  };

  return (
    <div className={classes.root}>
      <Fab
        color={!edit ? 'primary' : 'secondary'}
        aria-label={!edit ? 'add' : 'save'}
        onClick={handleClick}
      >
        <i className='material-icons white-text'>{!edit ? 'edit' : 'save'}</i>
      </Fab>
    </div>
  );
};

const mapStateToProps = (state) => ({
  edit: state.clients.edit,
});
export default connect(mapStateToProps)(EditButton);
