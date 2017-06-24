import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import puestoServicio from './componentes/ContainerPuestoServicio';
import tecnicos from './componentes/ContainerTecnicos';
import entidades from './componentes/ContainerEntidades';

export default (
   <Router history={Router.hashHistory}>
       <div>
		   <div className="col-md-2 menu-lateral">
			   <ul className="nav nav-pills nav-stacked">
				   <li><Link to="/">Home</Link></li>
				   <li><Link to="/tecnicos">Técnicos</Link></li>
        		   <li><Link to="/entidades">Entidades</Link></li>
			   </ul>
		   </div>
		   <Route exact path="/" component={puestoServicio} />
           <Route exact path="/tecnicos" component={tecnicos} />
		   <Route path="/entidades" component={entidades} />
	   </div>

   </Router>
  );
