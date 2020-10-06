import React, { Fragment, useState } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import NewClientForm from './NewClientForm';
import DiscardAlertModal from './utils/DiscardAlertModal';
import { addClient } from '../../actions/client';

const AddClientModal = ({ isOpen, anyTouched, setOpenModal, addClient }) => {
  const useStyles = makeStyles((theme) => ({
    dialogCustomizedWidth: {
      'max-width': '60%',
    },
    content: {
      paddingBottom: '20px',
    },
  }));
  const classes = useStyles();

  // Discard changes alert modal state
  const [openAlert, setOpenAlert] = useState(false);

  // discard unsaved changes
  const handleDiscard = () => {
    setOpenAlert(false);
    setOpenModal(false);
  };

  // handle dialog close
  const handleClose = () => {
    if (anyTouched) {
      return setOpenAlert(true);
    }
    setOpenModal(false);
  };

  // handle Save Btn
  const handleSave = (values) => {
    addClient(values);
    setOpenModal(false);
    // setPostCreateModal(true);
  };

  return (
    <Fragment>
      <Dialog
        fullWidth={false}
        open={isOpen}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby='max-width-dialog-title'
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
      >
        <DialogTitle>
          <div>
            <h5
              className='grey-text text-darken-1'
              style={{ marginLeft: '30px', marginBottom: '15px' }}
            >
              Add new client...
            </h5>
          </div>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <NewClientForm onSubmit={(values) => handleSave(values)} />
        </DialogContent>
        <DiscardAlertModal
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          handleDiscard={handleDiscard}
          text={'Discard Changes?'}
          confirmBtn='Discard'
          cancleBtn='Cancel'
        />
      </Dialog>
    </Fragment>
  );
};

AddClientModal.propTypes = {
  addClient: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  anyTouched: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

const connectedReduxForm = reduxForm({
  form: 'newClientForm',
})(AddClientModal);

export default connect(null, { addClient })(connectedReduxForm);
