import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';

import PrivateRoute from '../routing/PrivateRoute';
import Header from '../layout/Header';
import Dashboard from '../dashboard/Dashboard';
import BigCalendar from '../calendar/BigCalendar';
import ClientsPage from '../clients/ClientsPage';

const Register = () => <div>Register</div>;

const Routes = () => {
  return (
    <Fragment>
      <Header />
      <Alert />
      <section>
        <Switch>
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/clients' component={ClientsPage} />
          <PrivateRoute exact path='/calendar' component={BigCalendar} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;

// <PrivateRoute exact path='/create-profile' component={CreateProfile} />
// <PrivateRoute exact path='/edit-profile' component={EditProfile} />
// <PrivateRoute exact path='/add-experience' component={AddExperience} />
// <PrivateRoute exact path='/add-education' component={AddEducation} />
// <PrivateRoute exact path='/posts' component={Posts} />
// <PrivateRoute exact path='/posts/:id' component={Post} />
// <Route component={NotFound} />
