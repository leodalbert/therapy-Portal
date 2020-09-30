import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import axios from 'axios';

import store from './store';
import App from './App';

window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
