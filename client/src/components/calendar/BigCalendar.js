import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
//import { getAppts } from '../../actions/appts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';

import PropTypes from 'prop-types';

const BigCalendar = () => {
  //   useEffect(() => {
  //     getAppts();
  //   }, [getAppts]);

  //   const { appts, current, error, loading } = apptReducer;
  //   const { id, clientName, date, lenght, apptNote } = appts;

  const events = {};

  return (
    <Fragment>
      <div className='container' style={{ marginTop: '10px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, momentPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'title',
            center: 'prev,today,next',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          fixedWeekCount={false}
          navLinks={true}
          events={events}
        />
      </div>
      <div className='fixed-action-btn'>
        <a
          className='btn-floating btn-large blue modal-trigger'
          href='#add-appt-modal'
        >
          <i className='fas fa-plus'></i>
        </a>
      </div>
    </Fragment>
  );
};

// BigCalendar.propTypes = {
//   apptReducer: PropTypes.object.isRequired,
//   getAppts: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   apptReducer: state.appts,
// });

export default connect()(BigCalendar);
