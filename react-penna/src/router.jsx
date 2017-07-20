import React from 'react';
require("./styles/menu.scss");
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import puestoServicio from './componentes/ContainerPuestoServicio';
import tecnicos from './componentes/ContainerTecnicos';
import entidades from './componentes/ContainerEntidades';
import equipos from './componentes/ContainerEquipos';
import solicitudes from './componentes/ContainerSolicitudes';
import personal from './componentes/ContainerPersonal';
import Layout from './componentes/genericos/Layout';
import Menu from './componentes/menu/Menu';
import subMenuPersonal from './componentes/menu/SubmenuPersonal';
import subMenuEquipo from './componentes/menu/SubmenuEquipo';
import subMenuSolicitud from './componentes/menu/SubmenuSolicitud';


export default (

   <Router history={Router.hashHistory}>
   <Layout>

    		   {/* <div className="col-md-2 menu-lateral">
    			   <ul className="nav nav-pills nav-stacked">
    				   <li><Link to="/">Home</Link></li>
    				   <li><Link to="/tecnicos">Técnicos</Link></li>
            		   <li><Link to="/entidades">Entidades</Link></li>
                       <li><Link to="/equipos">Equipos</Link></li>
                       <li><Link to="/solicitudes">Solicitudes</Link></li>
                       <li><Link to="/personal">Personal</Link></li>
    			   </ul>
    		   </div> */}
                <Menu/>

                {/* <Route exact path="/"  component={subMenuPersonal} /> */}
                    <Route exact path="/personal"  component={subMenuPersonal} />
                    <Route exact path="/personal/personal" component={personal} />
                    <Route exact path="/personal/puesto_servicio" component={puestoServicio} />
                    <Route exact path="/personal/tecnicos" component={tecnicos} />
                    <Route path="/personal/entidades" component={entidades} />

                    <Route exact path="/equipo"  component={subMenuEquipo} />
                    <Route path="/equipo/equipos" component={equipos} />

                    <Route exact path="/solicitud"  component={subMenuSolicitud} />
                    <Route path="/solicitud/solicitudes" component={solicitudes} />



   </Layout>
   </Router>

  );
