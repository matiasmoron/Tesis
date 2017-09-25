// require("./styles/menu.scss");
import React from 'react';
import store from './store';
import { BrowserRouter as Router, Route, Link,Redirect,Switch } from 'react-router-dom'
import Container from './componentes/Container';
import servicio from './componentes/personal/PanelServicio';
//import puesto from './componentes/personal/PanelPuesto';
import tecnicos from './componentes/personal/PanelTecnico';
import entidades from './componentes/personal/PanelEntidad';
import equipos from './componentes/PanelEquipo';
import prestaciones from './componentes/PanelPrestacion';
import personal from './componentes/personal/PanelPersonal';
import ordenes_ver from './componentes/PanelOrdenesVer';
import ordenes_abm from './componentes/PanelOrdenesABM';
import ordenes_admin from './componentes/PanelOrdenesAdmin';
import Layout from './componentes/genericos/Layout';
import Menu from './componentes/menu/Menu';
import submenuOrdenes from './componentes/menu/SubmenuOrdenes';
import submenuPersonal from './componentes/menu/SubmenuPersonal';
import submenuBienes from './componentes/menu/SubmenuBienes';
import submenuConfiguracion from './componentes/menu/SubmenuConfiguracion';
import Inicio from './componentes/Inicio';
import AuthorizedRoute from './componentes/AuthorizedRoute';
import ErrorServer from './componentes/commons/ErrorServer';

import { ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default (

   <ConnectedRouter history={history}>
        <div>
            <Route exact  path="/auth"  component={Inicio} />
            <AuthorizedRoute>
               <Layout>
                   <ErrorServer/>
                   <Menu/>
                   <Container>
                        <Switch>
                            <Route exact path="/" component={submenuOrdenes} />
                            <Route path="/ordenes/ver"  component={ordenes_ver} />
                            <Route path="/ordenes/abm"  component={ordenes_abm} />
                            <Route path="/ordenes/administrar"  component={ordenes_admin} />
                            <Route path="/ordenes"  component={submenuOrdenes} />

                            <Route path="/personal/personal" component={personal} />
                            <Route path="/personal/puesto_servicio" component={servicio} />
                            <Route path="/personal/tecnicos" component={tecnicos} />
                            <Route path="/personal/entidades" component={entidades} />
                            <Route path="/personal"  component={submenuPersonal} />

                            <Route path="/bienes/equipos" component={equipos} />
                            <Route path="/bienes/prestaciones" component={prestaciones} />
                            <Route path="/bienes"  component={submenuBienes} />

                            <Route path="/configuracion/mi_cuenta" component={equipos} />
                            <Route path="/configuracion"  component={submenuConfiguracion} />
                            <Redirect to="/ordenes"/>
                        </Switch>
                    </Container>
                </Layout>
            </AuthorizedRoute>
        </div>
   </ConnectedRouter>

  );
