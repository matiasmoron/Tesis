var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgVerOrden from '../../img/menu/ver_orden.png';
import imgAdmin from '../../img//menu/orden_admin2.png';
import imgNuevaOrden from '../../img/menu/nueva_orden2.png';




const SubmenuOrdenes = (props) => {
      return (
            <Cards>
                <Card url="/ordenes/ver" nombre="Ver órdenes" logo={imgVerOrden}/>
                <Card url="/ordenes/abm" nombre="Nueva Orden" logo={imgNuevaOrden}/>
                <Card url="/ordenes/administrar" nombre="Administración" logo={imgAdmin}/>
            </Cards>
      );
}

export default SubmenuOrdenes
