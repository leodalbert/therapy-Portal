import React from 'react';

const AddClientBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a
        className='btn-floating btn-large blue modal-trigger'
        href='#add-client-modal'
      >
        <i className='large material-icons'>person_add</i>
      </a>
    </div>
  );
};

export default AddClientBtn;
