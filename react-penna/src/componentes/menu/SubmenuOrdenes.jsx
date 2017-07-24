var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuOrdenes = (props) => {
      return (
            <Cards>
                <Card url="/solicitud/ver" nombre="Ver Órdenes" />
                <Card url="/solicitud/abm" nombre="ABM Órdenes" />
                <Card url="/solicitud/administrar" nombre="Administración" />
            </Cards>
      );
}

export default SubmenuOrdenes
