var React = require('react');
import Card from './Card';
import Cards from './Cards';

const SubmenuOrdenes = (props) => {
      return (
            <Cards>
                <Card url="/ordenes/ver" nombre="Ver órdenes"/>
                <Card url="/ordenes/crear" nombre="Crear nueva Orden"/>
                <Card url="/ordenes/administrar" nombre="Administración"/>
            </Cards>
      );
}

export default SubmenuOrdenes
