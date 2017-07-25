// require("./styles/menu.scss");
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import puestoServicio from './componentes/ContainerPuestoServicio';
import tecnicos from './componentes/ContainerTecnicos';
import entidades from './componentes/ContainerEntidades';
import equipos from './componentes/ContainerEquipos';
import personal from './componentes/ContainerPersonal';
import Layout from './componentes/genericos/Layout';
import Menu from './componentes/menu/Menu';
import submenuOrdenes from './componentes/menu/SubmenuOrdenes';
import submenuPersonal from './componentes/menu/SubmenuPersonal';
import submenuBienes from './componentes/menu/SubmenuBienes';
import submenuConfiguracion from './componentes/menu/SubmenuConfiguracion';

export default (

   <Router history={Router.hashHistory}>
   <Layout>
        <Menu/>
        <Route exact path="/ordenes"  component={submenuOrdenes} />
        <Route exact path="/ordenes/ver"  component={submenuOrdenes} />
        <Route exact path="/ordenes/crear"  component={submenuOrdenes} />
        <Route exact path="/ordenes/administrar"  component={submenuOrdenes} />

        <Route exact path="/personal"  component={submenuPersonal} />
        <Route exact path="/personal/personal" component={personal} />
        <Route exact path="/personal/puesto_servicio" component={puestoServicio} />
        <Route exact path="/personal/tecnicos" component={tecnicos} />
        <Route path="/personal/entidades" component={entidades} />

        <Route exact path="/bienes"  component={submenuBienes} />
        <Route path="/bienes/equipos" component={equipos} />
        <Route path="/bienes/prestaciones" component={equipos} />

        <Route exact path="/configuracion"  component={submenuConfiguracion} />
        <Route path="/configuracion/mi_cuenta" component={equipos} />
   </Layout>
   </Router>

  );
