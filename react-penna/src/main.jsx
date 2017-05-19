import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import Bs from 'react-bootstrap/lib';
import container from './componentes/table';

require ("./styles/prueba.scss");

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(container),
    document.getElementById('container')
  );
});
