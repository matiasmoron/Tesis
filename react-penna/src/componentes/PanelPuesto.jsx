var React = require('react');

import * as servicioApi from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import TablePuesto from './TablePuesto';

class PanelPuesto extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		servicioApi.getServicios();
	}


	_addElemento(){
        servicioApi.addServicios(this._nombre.value);
		servicioApi.getServicios();
    }

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación puesto" submit={this._addElemento.bind(this)}>
				<Input label="Nombre" valor={input => this._nombre = input} />
				<button type="submit" className="btn btn-success">Agregar Puesto</button>
			</Formulario>
        	<TablePuesto datos_elemento={this.props.servicios}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {

  return {
    servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelPuesto);
