var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgMedico from '../../img/medicos.png';
import imgPersonal from '../../img/compras.png';



const SubmenuPersonal = (props) => {
      return (
            <Cards>
                <Card url="/personal/personal" icon="glyphicon glyphicon-plus" nombre="Personal" logo={imgMedico}/>
                <Card url="/personal/tecnicos" icon="glyphicon glyphicon-plus"  nombre="Tecnico" logo={imgMedico}/>
                <Card url="/personal/puesto_servicio" icon="glyphicon glyphicon-plus" nombre="Puesto - Servicio" logo={imgMedico} />
                <Card url="/personal/entidades" icon="glyphicon glyphicon-plus" nombre="Entidad" logo={imgPersonal}/>
            </Cards>
      );
}

export default SubmenuPersonal
