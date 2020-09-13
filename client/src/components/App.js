import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>dashboard</h2>;
const SurveyNew = () => <h2>SurveryNew</h2>;
const App = (actions) => {
  useEffect(() => {
    actions.fetchUser();
  }, [actions]);

  return (
    <div className='container'>
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/surveys/new' component={SurveyNew} />
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, actions)(App);
