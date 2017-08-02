// require("./styles/menu.scss");
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Container from './componentes/Container';
import servicio from './componentes/PanelServicio';
//import puesto from './componentes/PanelPuesto';
import tecnicos from './componentes/PanelTecnico';
import entidades from './componentes/PanelEntidad';
import equipos from './componentes/PanelEquipo';
import personal from './componentes/PanelPersonal';
import ordenes_ver from './componentes/PanelOrdenesVer';
import ordenes_abm from './componentes/PanelOrdenesABM';
import ordenes_admin from './componentes/PanelOrdenesAdmin';
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
        <Container>
            <Route exact path="/ordenes"  component={submenuOrdenes} />
            <Route exact path="/ordenes/ver"  component={ordenes_ver} />
            <Route exact path="/ordenes/abm"  component={ordenes_abm} />
            <Route exact path="/ordenes/administrar"  component={submenuOrdenes} />

            <Route exact path="/personal"  component={submenuPersonal} />
            <Route exact path="/personal/personal" component={personal} />
            <Route exact path="/personal/puesto_servicio" component={servicio} />
            <Route exact path="/personal/tecnicos" component={tecnicos} />
            <Route path="/personal/entidades" component={entidades} />

            <Route exact path="/bienes"  component={submenuBienes} />
            <Route path="/bienes/equipos" component={equipos} />
            <Route path="/bienes/prestaciones" component={equipos} />

            <Route exact path="/configuracion"  component={submenuConfiguracion} />
            <Route path="/configuracion/mi_cuenta" component={equipos} />
        </Container>
   </Layout>
   </Router>

  );
