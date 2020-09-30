import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';

const ClientInfoForm = ({
  initialValues,
  handleSubmit,
  handleChange,
  value,
}) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    M.FloatingActionButton.init(
      document.querySelectorAll('.fixed-action-btn'),
      {
        direction: 'top',
        hoverEnabled: true,
      }
    );
  });
  const {
    name,
    birthday,
    highRisk,
    address,
    phone,
    email,
    alias,
    clientSince,
    nextAppt,
    nextApptReminders,
    doctor,
    doctorContact,
    diagnoses,
    medication,
  } = initialValues;

  return (
    <div className='row' style={{ margin: '0px 30px' }}>
      <form className='col s6' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='input-field col s7'>
            <i className='fa fa-user prefix'></i>
            <input name='name' type='text' />
          </div>

          <div className='input-field col s6'>
            <i className='fa fa-phone prefix'></i>
            <input
              name='phone'
              type='text'
              value={value}
              onChange={handleChange}
            />
            <label className='active'>Phone Number</label>
          </div>

          <div className='input-field col s6'>
            <i className='fa fa-at prefix'></i>
            <input name='email' type='email' className='validate' />
            <label className='active'>Email</label>
          </div>

          <div className='input-field col s6'>
            <i className='fa fa-user-secret prefix'></i>
            <input name='alias' type='text' />
            <label className='active'>Alias / Nickname</label>
          </div>
        </div>
      </form>
      <div className='fixed-action-btn'>
        <a
          className={`btn-floating btn-large ${!edit ? 'blue' : 'green'}`}
          onClick={() => setEdit(!edit)}
        >
          <i className='large material-icons'>{!edit ? 'edit' : 'check'}</i>
        </a>
      </div>
    </div>
  );
};

ClientInfoForm.propTypes = {};

const mapStateToProps = (state) => ({
  initialValues: state.clients.client,
});

export default connect(mapStateToProps)(ClientInfoForm);
