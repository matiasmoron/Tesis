var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuSolicitud = (props) => {
      return (
            <Cards>
                <Card url="/solicitud/solicitudes" icon="glyphicon glyphicon-plus" nombre="Solicitud" />
            </Cards>
      );
}

export default SubmenuSolicitud
