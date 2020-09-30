import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchUser } from './actions/auth';
import moment from 'moment';
import store from './store';

// Mateial Ui
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

// Materializsecss
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Theme for date picker
const Theme = {
  palette: {
    primary: {
      main: teal['200'],
    },
    secondary: {
      main: '#29b6f6',
    },
  },
};
const theme = createMuiTheme(Theme);

const App = () => {
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
