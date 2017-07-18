var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuEquipo = (props) => {
      return (
            <Cards>
                <Card url="/equipo/equipos" icon="glyphicon glyphicon-plus" nombre="Equipo" />
            </Cards>
      );
}

export default SubmenuEquipo
