var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuConfiguracion = (props) => {
      return (
            <Cards>
                <Card url="/configuracion/mi_cuenta" nombre="Mi cuenta" />
            </Cards>
      );
}

export default SubmenuConfiguracion
