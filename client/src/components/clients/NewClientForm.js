import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DatePickerField from './utils/DatePickerField';

const ValField = ({ input, placeholder, meta: { touched, error } }) => {
  return (
    <div>
      <input
        {...input}
        style={{ marginBottom: '5px', margin: '0px 0px 8px 45px' }}
        placeholder={placeholder}
      />
      <div className='red-text' style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

const NewClientForm = ({ handleSubmit }) => {
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className='row' style={{ margin: '0px 20px' }}>
          <div className='col s12'>
            <div className='row'>
              <div className='input-field col s7'>
                <i className='fa fa-user prefix'></i>
                <Field
                  name='name'
                  type='text'
                  component={ValField}
                  placeholder='Name'
                />
              </div>
              <label className='col s3 offset-s1'>
                <Field name='highRisk' type='checkbox' component='input' />
                <span>High Risk</span>
              </label>
              <div className='input-field col s6'>
                <i className='fa fa-phone prefix'></i>
                <Field
                  name='phone'
                  type='text'
                  component='input'
                  placeholder='Phone number'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fa fa-at prefix'></i>
                <Field
                  name='email'
                  type='email'
                  component='input'
                  placeholder='Email'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fa fa-user-secret prefix'></i>
                <Field
                  name='alias'
                  type='text'
                  component='input'
                  placeholder='Alias / Nickname'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fas fa-birthday-cake prefix'></i>
                <Field
                  name='birthday'
                  component={DatePickerField}
                  edit={true}
                  placeholder='Birthday'
                  openTo='year'
                  views={['year', 'date']}
                />
              </div>
              <div className='input-field col s12'>
                <i className='fas fa-home prefix'></i>
                <Field
                  name='address'
                  type='text'
                  className='validate'
                  component='input'
                  placeholder='Address'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fas fa-star-of-life prefix'></i>
                <Field
                  name='doctor'
                  type='text'
                  component='input'
                  placeholder='Doctor'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fas fa-user-md prefix'></i>
                <Field
                  name='doctorContact'
                  type='text'
                  component='input'
                  placeholder='Doctor Contact'
                />
              </div>
              <div className='input-field col s6'>
                <i className='fas fa-history prefix'></i>
                <Field
                  name='clientSince'
                  component={DatePickerField}
                  edit={true}
                  placeholder='Client Since'
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className='btn waves-effect waves-light right'
          type='submit'
          name='action'
        >
          Create
          <i className='material-icons right' style={{ marginLeft: '5px' }}>
            check
          </i>
        </button>
      </form>
    </Fragment>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }

  return errors;
};

NewClientForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const connectedReduxForm = reduxForm({
  validate,
  form: 'newClientForm',
  //   enableReinitialize: false,
  destroyOnUnmount: true,
})(NewClientForm);

export default connect()(connectedReduxForm);
