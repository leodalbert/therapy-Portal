import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { user, loading },
  ...rest
}) => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        !user && !loading ? (
          <Redirect to='/landing' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
