var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuPersonal = (props) => {
      return (
            <Cards>
                <Card url="/personal/personal" icon="glyphicon glyphicon-plus" nombre="Personal" />
                <Card url="/personal/tecnicos" icon="glyphicon glyphicon-plus"  nombre="Tecnico" />
                <Card url="/personal/puesto_servicio" icon="glyphicon glyphicon-plus" nombre="Puesto - Servicio" />
                <Card url="/personal/entidades" icon="glyphicon glyphicon-plus" nombre="Entidad" />
            </Cards>
      );
}

export default SubmenuPersonal
