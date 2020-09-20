import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

const Dashboard = ({ setAlert }) => {
  return (
    <div>
      <button onClick={() => setAlert('this is an alert', 'alert-danger')}>
        click for alert
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

// const MapStateToProps = (state) => ({
//   clients: state.clients,
// });
export default connect(null, {
  setAlert,
})(Dashboard);
