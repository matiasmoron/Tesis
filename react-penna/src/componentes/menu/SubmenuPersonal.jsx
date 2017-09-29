var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgPersonal from '../../img/menu/personal.png';
import imgTecnico from '../../img/menu/tecnico.png';
import imgPuestoServicio from '../../img/menu/puesto-servicio.png';
import imgEntidad from '../../img/menu/entidad.png';

let opc_habilitados = [1,2];

let Submenu ={
        1:{url:"/personal/personal"         ,nombre:"Personal"     ,logo:imgPersonal},
        2:{url:"/personal/puesto_servicio"   ,nombre:"Servicio"     ,logo:imgPuestoServicio}
}
var cargar_submenu = (props) => {
	let habilitados = [];
	opc_habilitados.map(function(opcion){
		habilitados.push(Submenu[opcion])
	});
	return habilitados;
}

var CardsHabilitados = (props) => {
	 let subMenu = cargar_submenu();
      return (
          <ul className="cards col-md-12">
			{subMenu.map(function(card){
               return (
                   <Card url={card.url} nombre={card.nombre} logo={card.logo} />
               );
            })}
        </ul>
      );
}


const SubmenuPersonal = (props) => {
      return (
            <Cards>
                <CardsHabilitados/>
            </Cards>
      );
}

export default SubmenuPersonal
