import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import ClientItem from './ClientItem';
import Preloader from '../layout/Preloader';
import AddClientBtn from './AddClientBtn';
import {
  getAllClients,
  getClient,
  showSearchbar,
  hideSearchbar,
} from '../../actions/client';
import PropTypes from 'prop-types';

const ClientPage = ({
  getAllClients,
  showSearchbar,
  hideSearchbar,
  clients: { clients, loading, filterText },
}) => {
  useEffect(() => {
    // on Mount
    showSearchbar();
    getAllClients();
    //  on Unmount
    return () => {
      hideSearchbar();
    };
  }, [showSearchbar, hideSearchbar, getAllClients]);

  const visClients = clients.filter((client) =>
    client.name.toLowerCase().includes(filterText.toLowerCase())
  );
  return loading ? (
    <Preloader />
  ) : (
    <Fragment>
      <div className='container'>
        {visClients.map((client) => (
          <ClientItem key={client._id} client={client} />
        ))}
      </div>
      <AddClientBtn />
    </Fragment>
  );
};

ClientPage.propTypes = {
  clients: PropTypes.object.isRequired,
  getAllClients: PropTypes.func.isRequired,
  getClient: PropTypes.func.isRequired,
  showSearchbar: PropTypes.func.isRequired,
  hideSearchbar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients,
});

export default connect(mapStateToProps, {
  getAllClients,
  getClient,
  showSearchbar,
  hideSearchbar,
})(ClientPage);
