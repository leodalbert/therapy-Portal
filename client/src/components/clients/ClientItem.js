import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import ClientModal from './ClientModal';

import { getClient, clearClient, getClientNotes } from '../../actions/client';

const ClientItem = ({
  getClient,
  clearClient,
  client: { _id, name, nextAppt, nextApptReminders, phone, email },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    getClient(_id);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    clearClient();
  };

  return (
    <Fragment>
      <div className='card'>
        <div className='card-content'>
          <ClientModal
            isOpen={isOpen}
            handleClose={handleModalClose}
            clientId={_id}
          />
          <span
            className='card-title activator grey-text text-darken-4'
            style={{ margin: '20px 0' }}
          >
            <div className='blue-text' onClick={() => handleModalOpen()}>
              {name}
            </div>
            <i className='small material-icons right'>contact_phone</i>
          </span>
          <div className='row grey-text text-darken-2'>
            <div className='col s5'>
              {nextApptReminders && (
                <div className='activator' style={{ margin: '10px' }}>
                  <p>
                    <strong> Reminders for next session: </strong>
                  </p>

                  {nextApptReminders.map((reminder) => {
                    return <li key={reminder}>{reminder}</li>;
                  })}
                </div>
              )}
            </div>
            <div className='col s4'>
              <div className='activator' style={{ margin: '10px' }}>
                <p>
                  <strong>Next appointment: </strong>
                </p>
                {nextAppt ? (
                  <p>{moment(nextAppt).format('dddd, MMMM Do [at] h:mm a')}</p>
                ) : (
                  <div className='waves-effect waves-light btn-small btn-flat left'>
                    <i className='far fa-calendar-alt'></i> Schedule!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            {name}
            <i className='material-icons right'>close</i>
          </span>
          {phone && (
            <p>
              <a href={'tel:' + phone}>
                <i className='material-icons left'>local_phone</i> {phone}
              </a>
            </p>
          )}
          {email && (
            <p>
              <a href={'mailto:' + email}>
                <i className='material-icons left'>email</i> {email}
              </a>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

ClientItem.propTypes = {
  client: PropTypes.object.isRequired,
  clearClient: PropTypes.func.isRequired,
  getClient: PropTypes.func.isRequired,
  getClientNotes: PropTypes.func.isRequired,
};

export default connect(null, {
  getClient,
  clearClient,
  getClientNotes,
})(ClientItem);
