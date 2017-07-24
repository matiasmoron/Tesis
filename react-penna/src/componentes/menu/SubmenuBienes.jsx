var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuBienes = (props) => {
      return (
            <Cards>
                <Card url="/bienes/equipos" nombre="Equipos" />
                <Card url="/bienes/prestaciones" nombre="Prestaciones" />
            </Cards>
      );
}

export default SubmenuBienes
