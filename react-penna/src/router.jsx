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

let submenu_hablitadas= [1,2,3,4,5,12];
let menu_hablitadas= [1,2,4];

var cargar_rutas = (props) => {
    let habilitados = [];
    submenu_hablitadas.map(function(opcion){
        habilitados.push(SubmenuRoute[opcion])
    });
    menu_hablitadas.map(function(opcion){
        habilitados.push(MenuRoute[opcion])
    });
    return habilitados;
}

var RutasHabilitadas = (props) => {
    let rutas = cargar_rutas();
    // Object.keys(rutas).map( (elem) =>{
    //     console.log(elem);
    //     console.log(rutas[elem].path);
    //     }
    // );

    // {rutas.map(function(ruta){
    //    return (
    //        <Route path={ruta.path} exact={ruta.exact} component={ruta.component}  />
    //    );
    // })}
    return (
        <Switch>
            <Route exact path="/" component={submenuOrdenes} />
            {
                Object.keys(rutas).map( (elem,index) =>{
                    // console.log(rutas[elem].path);
                    return (
                        <Route key={index} path={rutas[elem].path} exact={rutas[elem].exact} component={rutas[elem].component}  />
                    )
                })
            }
            <Redirect to="/ordenes"/>
        </Switch>
    );
}


let SubmenuRoute ={
        1:{path:"/ordenes/ver"         ,component:ordenes_ver  },
        2:{path:"/ordenes/abm"         ,component:ordenes_abm },
        3:{path:"/ordenes/administrar" ,component:ordenes_admin },
        4:{path:"/personal/puesto_servicio" ,component:servicio},
        5:{path:"/personal/personal" ,component:personal},
        12:{path:"/configuracion/mi_cuenta" ,component:equipos },
}

let MenuRoute ={
        1:{path:"/ordenes" ,component:submenuOrdenes,exact:true},
        2:{path:"/personal" ,component:submenuPersonal,exact:true},
        4:{path:"/configuracion" ,component:submenuConfiguracion,exact:true}

}

export default (

   <ConnectedRouter history={history}>
        <div>
            <Route exact  path="/auth"  component={Inicio} />
            <AuthorizedRoute>
               <Layout>
                   <ErrorServer/>
                   <Menu/>
                   <Container>
                        <RutasHabilitadas />
                    </Container>
                </Layout>
            </AuthorizedRoute>
        </div>
   </ConnectedRouter>

  );
