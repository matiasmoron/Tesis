import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import puestoServicio from './componentes/ContainerPuestoServicio';
import tecnicos from './componentes/ContainerTecnicos';
import entidades from './componentes/ContainerEntidades';
import equipos from './componentes/ContainerEquipos';
import solicitudes from './componentes/ContainerSolicitudes';
import personal from './componentes/ContainerPersonal';
import Layout from './componentes/genericos/Layout';

export default (

   <Layout>
       <Router history={Router.hashHistory}>
           <div>
    		   <div className="col-md-2 menu-lateral">
    			   <ul className="nav nav-pills nav-stacked">
    				   <li><Link to="/">Home</Link></li>
    				   <li><Link to="/tecnicos">Técnicos</Link></li>
            		   <li><Link to="/entidades">Entidades</Link></li>
                       <li><Link to="/equipos">Equipos</Link></li>
                       <li><Link to="/solicitudes">Solicitudes</Link></li>
                       <li><Link to="/personal">Personal</Link></li>
    			   </ul>
    		   </div>
               <Route exact path="/" component={puestoServicio} />
               <Route exact path="/tecnicos" component={tecnicos} />
    		   <Route path="/entidades" component={entidades} />
               <Route path="/equipos" component={equipos} />
               <Route path="/solicitudes" component={solicitudes} />
               <Route path="/personal" component={personal} />
    	   </div>

       </Router>
   </Layout>
  );
