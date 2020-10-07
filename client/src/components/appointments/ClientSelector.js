import React, { useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ClientSelector = ({ clients }) => {
  return (
    clients !== null &&
    clients.map((client) => (
      <MenuItem key={client._id} value={client._id}>
        {client.name}
      </MenuItem>
    ))
  );
};

ClientSelector.propTypes = {
  clients: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
});

export default connect(mapStateToProps)(ClientSelector);
