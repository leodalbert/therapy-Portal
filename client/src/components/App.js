import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../actions/user';
import store from '../store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';

import Header from './layout/Header';
import Landing from './layout/Landing';
import Dashboard from './dashboard/Dashboard';
import Alert from './layout/Alert';

const SurveyNew = () => <h2>SurveryNew</h2>;
const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Alert />
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/surveys/new' component={SurveyNew} />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
