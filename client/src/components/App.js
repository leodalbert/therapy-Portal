import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchUser } from '../actions/auth';
import store from '../store';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-social/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';

import Landing from './layout/Landing';
import Routes from './routing/Routes';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
