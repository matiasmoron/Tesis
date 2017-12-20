import React from 'react';
import ReactDOM from 'react-dom';
import Bs from 'react-bootstrap/lib';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
//require('es6-promise').polyfill();

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('container')
  );
});
