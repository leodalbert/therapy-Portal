import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';
import { isDirty } from 'redux-form';
import M from 'materialize-css';
import DiscardAlertModal from './DiscardAlertModal';
import { editClient } from '../../../actions/client';

const EditButton = ({
  dispatch,
  edit,
  isDirty,
  archived,
  handleArchive,
  handleDelete,
}) => {
  useEffect(() => {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  }, []);

  // Discard changes alert modal state
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = () => {
    if (!edit) {
      dispatch(editClient(true));
    } else {
      if (isDirty) {
        dispatch(submit('editClientForm'));
      }
      dispatch(editClient(false));
    }
  };

  return (
    <div className='fixed-action-btn' style={{ position: 'absolute' }}>
      <div
        className={`btn-floating btn-large ${edit && 'blue'}`}
        onClick={handleClick}
      >
        <i className='large material-icons'>{!edit ? 'edit' : 'save'}</i>
      </div>
      <ul>
        <li>
          <div
            className={`btn-floating red ${
              (!edit || !archived) && 'visibleOnEdit'
            }`}
            onClick={() => setOpenAlert(true)}
          >
            <i className='fas fa-trash'> </i>
          </div>
        </li>
        <li>
          <div
            className={`btn-floating ${!archived ? 'red' : 'green'} ${
              !edit && 'visibleOnEdit'
            }`}
            onClick={handleArchive}
          >
            <i className={!archived ? 'fas fa-archive' : 'fas fa-box-open'}></i>
          </div>
        </li>
      </ul>
      <DiscardAlertModal
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDiscard={handleDelete}
        text={'Permanently Delete Client?'}
        confirmBtn='Delete'
        cancleBtn='Cancel'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  edit: state.clients.edit,
  archived: state.clients.client.archived,
  isDirty: isDirty('editClientForm')(state),
});
export default connect(mapStateToProps)(withRouter(EditButton));
