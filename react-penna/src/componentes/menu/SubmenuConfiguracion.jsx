var React = require('react');
import Card from './Card';
import Cards from './Cards';
import imgConfig from '../../img/menu/config.png';


const SubmenuConfiguracion = (props) => {
      return (
            <Cards>
                <Card url="/configuracion/mi_cuenta" nombre="Mi cuenta" logo={imgConfig}/>
            </Cards>
      );
}

export default SubmenuConfiguracion
