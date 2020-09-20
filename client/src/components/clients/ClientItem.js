import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const ClientItem = ({
  client: { name, nextAppt, nextApptReminders, phone, email },
}) => {
  return (
    <Fragment>
      <div className='card'>
        <div className='card-content'>
          <span
            className='card-title activator grey-text text-darken-4'
            style={{ margin: '20px 0' }}
          >
            {name}
            <i className='small material-icons right'>contact_phone</i>
          </span>
          {nextAppt && (
            <div className='activator' style={{ margin: '10px' }}>
              <p>
                <strong>Next appointment: </strong>
              </p>
              {moment(nextAppt).format('dddd, MMMM Do [at] h:mm a')}
            </div>
          )}
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
};

export default ClientItem;
