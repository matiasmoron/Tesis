import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import container from './componentes/container';
import counter from './componentes/Counter';

export default (
	<Router history={Router.hashHistory}>
	   <div>
		 <ul>
		   <li><Link to="/">Home</Link></li>
		   <li><Link to="/counter">Counter</Link></li>
		 </ul>
		 <hr />

		 <Route exact path="/" component={container} />
		 <Route path="/counter" component={counter} />
	 </div>
   </Router>
  );
