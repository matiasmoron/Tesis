var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgVerOrden from '../../img/menu/ver_orden.png';
import imgAdmin from '../../img//menu/orden_admin2.png';
import imgNuevaOrden from '../../img/menu/nueva_orden2.png';

let opc_habilitados = [1,2];

let Submenu ={
        1:{url:"/ordenes/ver"         ,nombre:"Ver órdenes"     ,logo:imgVerOrden},
        2:{url:"/ordenes/abm"         ,nombre:"Nueva Orden"     ,logo:imgNuevaOrden},
        3:{url:"/ordenes/administrar" ,nombre:"Administración"  ,logo:imgAdmin}
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

const SubmenuOrdenes = (props) => {
      return (
            <Cards>
                <CardsHabilitados/>
            </Cards>
      );
}

export default SubmenuOrdenes
