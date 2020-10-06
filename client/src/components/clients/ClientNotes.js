import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getClientNotes,
  editNewNote,
  submitClientNote,
} from '../../actions/client';
import PropTypes from 'prop-types';

import ClientNoteItem from './ClientNoteItem';

const ClientNotes = ({
  edit,
  clientId,
  clientNotes,
  getClientNotes,
  note,
  editNewNote,
  submitClientNote,
}) => {
  const latestNote = useRef('');
  useEffect(() => {
    latestNote.current = note;
  });

  useEffect(() => {
    getClientNotes(clientId);
    return () => {
      if (latestNote.current.note) {
        submitClientNote(latestNote.current, clientId);
      }
    };
  }, [getClientNotes, clientId, submitClientNote]);

  const handleEditNewNote = (text) => {
    editNewNote(text);
  };

  const handleSubmit = () => {
    if (latestNote.current.note) {
      submitClientNote(latestNote.current, clientId);
    }
  };
  return (
    <Fragment>
      <div className='row'>
        <div className='input-field col s11'>
          <textarea
            id='clientNote'
            className='materialize-textarea'
            value={note.note}
            onChange={(e) => handleEditNewNote(e.target.value)}
          />
          <label htmlFor='clientNote'>New Note</label>
        </div>
        <div className='input-field col s12 m4 l1'>
          <button
            className='waves-effect waves-teal btn-flat teal-text'
            type='submit'
            onClick={handleSubmit}
          >
            <i className='fas fa-check'></i>
          </button>
        </div>
      </div>
      <div>
        {clientNotes.map((note) => {
          return <ClientNoteItem key={note._id} note={note} edit={edit} />;
        })}
      </div>
    </Fragment>
  );
};

ClientNotes.propTypes = {
  getClientNotes: PropTypes.func.isRequired,
  clientNotes: PropTypes.array.isRequired,
  clientId: PropTypes.string.isRequired,
  edit: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  clientId: state.clients.client._id,
  clientNotes: state.clients.clientNotes,
  note: state.clients.newNote,
  edit: state.clients.edit,
});

const mapDispatchToProps = {
  getClientNotes,
  editNewNote,
  submitClientNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientNotes);
