import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import container from './componentes/Container';
import counter from './componentes/Counter';

export default (
   // outer history={Router.hashHistory}>
   //  <div>
   // <ul>
   //   <li><Link to="/">Home</Link></li>
   //   <li><Link to="/counter">Counter</Link></li>
   // </ul>
   // <hr />
   //
   // <Route exact path="/" component={container} />
   // <Route path="/counter" component={counter} />
   // /div>
   // </Router>
   <Router history={Router.hashHistory}>
	   <div>
		   <div className="col-md-2 menu-lateral">
			   <ul className="nav nav-pills nav-stacked">
				   <li><Link to="/">Home</Link></li>
				   <li><Link  to="/counter">Counter</Link></li>
        			<li><Link to="/counter">Counter</Link></li>
				   <li><Link to="/counter">Counter</Link></li>
				   <li><Link to="/counter">Counter</Link></li>
				   <li><Link to="/counter">Counter</Link></li>
			   </ul>
		   </div>
		   <Route exact path="/" component={container} />
		   <Route path="/counter" component={counter} />
		   <Route path="/counter" component={counter} />
		   <Route path="/counter" component={counter} />
		   <Route path="/counter" component={counter} />
		   <Route path="/counter" component={counter} />
	   </div>

   </Router>
  );
