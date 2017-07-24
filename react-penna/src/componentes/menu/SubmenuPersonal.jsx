var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgMedico from '../../img/medicos.png';
import imgPersonal from '../../img/compras.png';



const SubmenuPersonal = (props) => {
      return (
            <Cards>
                <Card url="/personal/personal" nombre="Personal" logo={imgMedico}/>
                <Card url="/personal/tecnicos"  nombre="Tecnico" logo={imgMedico}/>
                <Card url="/personal/puesto_servicio" nombre="Puesto - Servicio" logo={imgMedico} />
                <Card url="/personal/entidades" nombre="Entidad" logo={imgPersonal}/>
            </Cards>
      );
}

export default SubmenuPersonal
