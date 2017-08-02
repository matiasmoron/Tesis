var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgEquipo from '../../img/menu/equipo.png';
import imgPrestacion from '../../img/menu/prestacion.png';



const SubmenuBienes = (props) => {
      return (
            <Cards>
                <Card url="/bienes/equipos" nombre="Equipos" logo={imgEquipo}/>
                <Card url="/bienes/prestaciones" nombre="Prestaciones" logo={imgPrestacion}/>
            </Cards>
      );
}

export default SubmenuBienes
