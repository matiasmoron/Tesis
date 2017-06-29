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


	_addElemento(event){
		event.preventDefault();
		servicioApi.addServicio(this._nombre.value);
    }
	_deleteServicio(id){
		servicioApi.deleteServicio(id);
    }
	_updateServicio(servicio){
		servicioApi.updateServicio(servicio);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación servicio" submit={this._addElemento.bind(this)}>
				<Input label="Nombre" valor={input => this._nombre = input} />
				<button type="submit" className="btn btn-success">Agregar servicio</button>
			</Formulario>
        	<TableServicio datos_elemento={this.props.servicios} updateServicio={this._updateServicio.bind(this)} deleteServicio={this._deleteServicio.bind(this)}/>
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
