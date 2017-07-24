// require("./styles/menu.scss");
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import puestoServicio from './componentes/ContainerPuestoServicio';
import tecnicos from './componentes/ContainerTecnicos';
import entidades from './componentes/ContainerEntidades';
import equipos from './componentes/ContainerEquipos';
import solicitudes from './componentes/ContainerSolicitudes';
import personal from './componentes/ContainerPersonal';
import Layout from './componentes/genericos/Layout';
import Menu from './componentes/menu/Menu';
import submenuOrdenes from './componentes/menu/SubmenuOrdenes';
import submenuPersonal from './componentes/menu/SubmenuPersonal';
import submenuBienes from './componentes/menu/SubmenuBienes';
import submenuSolicitud from './componentes/menu/SubmenuSolicitud';
import submenuConfiguracion from './componentes/menu/SubmenuConfiguracion';

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

                {/* <Route exact path="/"  component={submenuPersonal} /> */}
                    <Route exact path="/ordenes"  component={submenuOrdenes} />
                    <Route exact path="/personal"  component={submenuPersonal} />
                    <Route exact path="/personal/personal" component={personal} />
                    <Route exact path="/personal/puesto_servicio" component={puestoServicio} />
                    <Route exact path="/personal/tecnicos" component={tecnicos} />
                    <Route path="/personal/entidades" component={entidades} />

                    <Route exact path="/bienes"  component={submenuBienes} />
                    <Route path="/bienes/equipos" component={equipos} />
                    <Route path="/bienes/prestaciones" component={equipos} />

                    <Route exact path="/solicitud"  component={submenuSolicitud} />
                    <Route path="/solicitud/solicitudes" component={solicitudes} />

                    <Route exact path="/configuracion"  component={submenuConfiguracion} />
                    <Route path="/configuracion/mi_cuenta" component={solicitudes} />


   </Layout>
   </Router>

  );
