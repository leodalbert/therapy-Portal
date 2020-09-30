import React from 'react';
import moment from 'moment';

const ClientNoteItem = ({ note, edit }) => {
  return (
    <div className='row' style={{ marginBottom: '0px' }}>
      <div className='card-panel white valign-wrapper'>
        <span className='card-title grey-text text-darken-3'>
          {moment(note.dateCreated).format('MM/DD/YYYY')}
        </span>

        <p className='grey-text text-darken-2 col s12'>{note.note}</p>
        {edit && (
          <div className='waves-effect waves-light btn-flat'>
            <i className='material-icons right red-text'>delete</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNoteItem;
