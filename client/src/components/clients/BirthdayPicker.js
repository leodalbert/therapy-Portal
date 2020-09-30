import React, { useEffect } from 'react';
import moment from 'moment';
import M from 'materialize-css';

const BirthdayPicker = ({ edit, birthday }) => {
  useEffect(() => {
    const options = {
      defaultDate: !!birthday
        ? new Date(moment(birthday).format('MM/DD/YYYY'))
        : new Date('01/01/2000'),
      setDefaultDate: true,
      selectMonths: true,
      minDate: new Date(moment('01/01/1900')),
      maxDate: new Date(moment()),
      yearRange: [1940, Number(moment().format('YYYY'))],
      format: 'mm/dd/yyyy',
      autoClose: false,
      container: document.getElementById('edit-client-modal'),
    };
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, options);
    return () => elems[0].M_Datepicker.close();
  });
  return (
    <div className='input-field col s6'>
      <i className='fas fa-birthday-cake prefix'></i>
      <input
        id='Birthday'
        type='text'
        className='datepicker'
        disabled={!edit}
      />
    </div>
  );
};

export default BirthdayPicker;
