import React, { Fragment } from 'react';
import EditClientModal from '../clients/EditClientModal';
import AddClientModal from '../clients/AddClientModal';

export default () => {
  return (
    <Fragment>
      <EditClientModal />
      <AddClientModal />
    </Fragment>
  );
};
