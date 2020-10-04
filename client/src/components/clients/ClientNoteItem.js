import React from 'react';
import moment from 'moment';
import DeleteButtonModal from './utils/DeleteButtonModal';
import EditNoteModal from './EditNoteModal';
import Typography from '@material-ui/core/Typography';

const ClientNoteItem = ({ note, edit }) => {
  return (
    <div className='row'>
      <div className='card-panel white valign-wrapper'>
        <span className='card-title grey-text text-darken-3'>
          {moment(note.dateCreated).format('MM/DD/YYYY')}
        </span>
        <Typography component='div' className='grey-text text-darken-2 col s12'>
          {note.note.split('\n').map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </Typography>
        {edit && (
          <div>
            <DeleteButtonModal id={note._id} />
            <EditNoteModal note={note} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNoteItem;
