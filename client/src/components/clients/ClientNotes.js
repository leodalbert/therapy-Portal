import React, { Fragment, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { getClientNotes } from '../../actions/client';
import PropTypes from 'prop-types';

import ClientNoteItem from './ClientNoteItem';

const ClientNotes = ({
  edit,
  clients: {
    client: { _id },
    clientNotes,
  },
}) => {
  return (
    <Fragment>
      <div>
        {clientNotes.map((note) => {
          return <ClientNoteItem key={note.note} note={note} edit={edit} />;
        })}
      </div>
    </Fragment>
  );
};

ClientNotes.propTypes = {
  getClientNotes: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients,
});

export default connect(mapStateToProps, { getClientNotes })(ClientNotes);
