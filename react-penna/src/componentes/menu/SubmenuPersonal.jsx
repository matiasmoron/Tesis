var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgPersonal from '../../img/menu/personal.png';
import imgTecnico from '../../img/menu/tecnico.png';
import imgPuestoServicio from '../../img/menu/puesto-servicio.png';
import imgEntidad from '../../img/menu/entidad.png';



const SubmenuPersonal = (props) => {
      return (
            <Cards>
                <Card url="/personal/personal" nombre="Personal" logo={imgPersonal}/>
                <Card url="/personal/tecnicos"  nombre="Tecnico" logo={imgTecnico}/>
                <Card url="/personal/puesto_servicio" nombre="Servicio" logo={imgPuestoServicio} />
                <Card url="/personal/entidades" nombre="Entidad" logo={imgEntidad}/>
            </Cards>
      );
}

export default SubmenuPersonal
