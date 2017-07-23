var React = require('react');

import * as ApiPersonal from '../api/personal_api';
import * as ApiServicio from '../api/servicio_api';
import * as ApiPuesto from '../api/puesto_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import SelectInput from './genericos/Select';
import TablePersonal from './TablePersonal';

class PanelPersonal extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		ApiPersonal.getPersonal();
		ApiServicio.getServicios();
		ApiPuesto.getPuestos();
	}


	_addElemento(event){
		event.preventDefault();
		console.log("entro en addElemento");
		ApiPersonal.addPersonal({legajo:this._legajo.value,usuario:this._usuario.value,
					id_puesto:this._id_puesto.value,id_servicio:this._id_servicio.value,
					dni:this._dni.value, nombre: this._nombre.value,
					apellido: this._apellido.value, fecha_ingreso: this._fecha_ingreso.value});
    }

	_deleteElemento(legajo){
		ApiPersonal.deletePersonal(legajo);
    }
	_updateElemento(personal){
		ApiPersonal.updatePersonal(personal);
	}

	render() {
	  return (
		<div className="col-md-12">
			<Formulario titulo="Creación Personal" submit={this._addElemento.bind(this)}>
				<Input label="legajo" valor={input => this._legajo = input} />
				<Input label="Usuario" valor={input => this._usuario = input} />
				<Input label="DNI" valor={input => this._dni = input} />
				<Input label="Nombre" valor={input => this._nombre = input} />
				<Input label="Apellido" valor={input => this._apellido = input} />
				<SelectInput data_opciones={this.props.puestos} llave="id_puesto" descripcion="nombre" label="Puestos"   valor={input => this._id_puesto = input} />
				<SelectInput data_opciones={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicio"   valor={input => this._id_servicio = input} />
				<Input label="Fecha Ingreso" valor={input => this._fecha_ingreso = input} />
				<button type="submit" className="btn btn-success">Agregar Personal</button>
			</Formulario>
        	<TablePersonal datos_elemento={this.props.personal}  getPersonal={ApiPersonal.getPersonal} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    personal: store.personalState.personal,
	servicios: store.servicioState.servicios,
	puestos: store.puestoState.puestos
  };
};

export default connect(mapStateToProps)(PanelPersonal);
