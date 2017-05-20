import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Bs from 'react-bootstrap/lib';
import container from './componentes/table';
import counter from './componentes/Counter';

require ("./styles/prueba.scss");

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
     <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/counter">Counter</Link></li>
          </ul>
          <hr />

          <Route exact path="/" component={container} />
          <Route path="/counter" component={counter} />
      </div>
    </Router>,
    document.getElementById('container')
  );
});
