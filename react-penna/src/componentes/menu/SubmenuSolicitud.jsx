var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuSolicitud = (props) => {
      return (
            <Cards>
                <Card url="/solicitud/ver" nombre="Ver solicitudes" />
                <Card url="/solicitud/abm" nombre="ABM Solicitudes" />
                <Card url="/solicitud/administrar" nombre="Administración" />
            </Cards>
      );
}

export default SubmenuSolicitud
