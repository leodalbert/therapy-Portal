import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';

import { getAppts } from '../../actions/appts';
import { getAllClients } from '../../actions/client';
import AddApptModal from '../appointments/AddApptModal';
import Preloader from '../layout/Preloader';

import PropTypes from 'prop-types';

const BigCalendar = ({
  getAppts,
  getAllClients,
  appts: { appts, loading },
}) => {
  useEffect(() => {
    getAppts();
    getAllClients();
  }, [getAppts, getAllClients]);
  const [openAddApptModal, setOpenAddApptModal] = useState(false);

  return loading ? (
    <Preloader />
  ) : (
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
          events={appts}
        />
      </div>
      <div className='fixed-action-btn'>
        <span
          className='btn-floating btn-large blue modal-trigger'
          onClick={() => setOpenAddApptModal(!openAddApptModal)}
        >
          <i className='fas fa-plus'></i>
        </span>
      </div>
      <AddApptModal
        isOpen={openAddApptModal}
        setOpenModal={setOpenAddApptModal}
      />
    </Fragment>
  );
};

BigCalendar.propTypes = {
  appts: PropTypes.object.isRequired,
  getAppts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appts: state.appts,
  clients: state.clients.clients,
});

export default connect(mapStateToProps, { getAppts, getAllClients })(
  BigCalendar
);
// {console.log(moment(appts[0].start).format('MMMM Do YYYY, h:mm:ss a'))}
