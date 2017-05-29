var React = require('react');

import * as servicioApi from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import TableServicio from './TableServicio';
import Input from './genericos/Input';

class PanelServicio extends React.Component {
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
			<Formulario titulo="Creación servicio" submit={this._addElemento.bind(this)}>
				<Input label="Nombre" valor={input => this._nombre = input} />
				<button type="submit" className="btn btn-success">Agregar servicio</button>
			</Formulario>
        	<TableServicio datos_elemento={this.props.servicios}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {

  return {
    servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelServicio);
