import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import MedChipGenerator from './utils/MedChipGenerator';
import DiagnosesChipGenerator from './utils/DiagnosesChipGenerator';
import DatePickerField from './utils/DatePickerField';
import Reminders from './Reminders';

const ClientInfoForm = ({ edit, initialValues, handleSubmit }) => {
  const {
    birthday,
    highRisk,
    address,
    phone,
    email,
    alias,
    clientSince,
    nextAppt,
    doctor,
    doctorContact,
    diagnoses,
    medication,
  } = initialValues;
  return (
    <Fragment>
      <div className='row' style={{ margin: '0px 30px' }}>
        <Form className='col s6' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='input-field col s7'>
              <i className='fa fa-user prefix'></i>
              <Field
                name='name'
                type='text'
                component='input'
                disabled={!edit}
              />
              {(highRisk || edit) && (
                <label className='col s3 offset-s1'>
                  <Field
                    name='highRisk'
                    type='checkbox'
                    component='input'
                    disabled={!edit}
                  />
                  <span>High Risk</span>
                </label>
              )}
            </div>
            {(phone || edit) && (
              <div className='input-field col s6'>
                <i className='fa fa-phone prefix'></i>
                <label className='active'>Phone Number</label>
                <Field
                  name='phone'
                  type='text'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(email || edit) && (
              <div className='input-field col s6'>
                <i className='fa fa-at prefix'></i>
                <label className='active'>Email</label>
                <Field
                  name='email'
                  type='email'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(alias || edit) && (
              <div className='input-field col s6'>
                <i className='fa fa-user-secret prefix'></i>
                <label className='active'>Alias / Nickname</label>
                <Field
                  name='alias'
                  type='text'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(birthday || edit) && (
              <div className='input-field col s6'>
                <i className='fas fa-birthday-cake prefix'></i>
                <label className='active'>Birthday</label>
                <Field
                  name='birthday'
                  component={DatePickerField}
                  edit={edit}
                />
              </div>
            )}
            {(address || edit) && (
              <div className='input-field col s12'>
                <i className='fas fa-home prefix'></i>
                <label className='active'>Address</label>
                <Field
                  name='address'
                  type='text'
                  className='validate'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(doctor || edit) && (
              <div className='input-field col s6'>
                <i className='fas fa-star-of-life prefix'></i>
                <label className='active'>Doctor</label>
                <Field
                  name='doctor'
                  type='text'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(doctorContact || edit) && (
              <div className='input-field col s6'>
                <i className='fas fa-user-md prefix'></i>
                <label className='active'>Doctor Contact</label>
                <Field
                  name='doctorContact'
                  type='text'
                  disabled={!edit}
                  component='input'
                />
              </div>
            )}
            {(clientSince || edit) && (
              <div className='input-field col s6'>
                <i className='fas fa-history prefix'></i>
                <label className='active'>Client Since</label>
                <Field
                  name='clientSince'
                  component={DatePickerField}
                  edit={edit}
                />
              </div>
            )}
            <div className='input-field col s6'>
              <i className='far fa-calendar-check prefix'></i>
              <label className='active'>Next Appointment</label>
              {nextAppt ? (
                <p style={{ marginLeft: '45px' }}>
                  {moment(nextAppt).format('MM/DD [at] h:mm a')}
                </p>
              ) : (
                <div
                  style={{ marginLeft: '30px', marginTop: '5px' }}
                  className='waves-effect waves-light btn-small btn-flat left'
                >
                  <i className='far fa-calendar-alt'></i> Schedule!
                </div>
              )}
            </div>
          </div>
        </Form>

        <div className='col s6'>
          {(medication.length > 0 || edit) && (
            <div className='row'>
              <Field
                name='medication'
                component={MedChipGenerator}
                edit={edit}
              />
            </div>
          )}
          {(diagnoses.length > 0 || edit) && (
            <div className='row'>
              <Field
                name='diagnoses'
                component={DiagnosesChipGenerator}
                edit={edit}
              />
            </div>
          )}
        </div>
        <div className='col s6'>
          <div className='row'>
            <Field name='nextApptReminders' component={Reminders} edit={edit} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ClientInfoForm.propTypes = {
  edit: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: state.clients.client,
});

const connectedReduxForm = reduxForm({
  form: 'editClientForm',
  enableReinitialize: false,
  destroyOnUnmount: false,
})(ClientInfoForm);

export default connect(mapStateToProps)(connectedReduxForm);
