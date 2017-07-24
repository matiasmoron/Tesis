var React = require('react');

import * as ApiSolicitud from '../api/solicitud_api';
import * as ApiEquipo from '../api/equipo_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import SelectInput from './genericos/Select';
import TableSolicitud from './TableSolicitud';

class PanelSolicitud extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		ApiSolicitud.getSolicitudes();
		ApiEquipo.getEquipos();
	}


	_addElemento(event){
		event.preventDefault();
		ApiSolicitud.addSolicitud({id_bien:this._id_bien.value,id_tipo_bien:this._id_tipo_bien.value,
					id_servicio_creacion:this._id_servicio_creacion.value,legajo_creacion:this._legajo_creacion.value,
					legajo_recepcion:this._legajo_recepcion.value,id_entidad:this._id_entidad.value});
    }

	_deleteElemento(id){
		ApiSolicitud.deleteSolicitud(id);
    }
	_updateElemento(solicitud){
		ApiSolicitud.updateSolicitud(solicitud);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación Solicitud" submit={this._addElemento.bind(this)}>
				<SelectInput data_opciones={this.props.equipos} llave="id_equipo" descripcion="descripcion" label="Equipos"   valor={input => this._id_equipo = input} />
				<Input label="Descripcion" valor={input => this._descripcion = input} />
				<Input label="Código Patrimonial" valor={input => this._cod_patrimonial = input} />
				<Input label="Servicio" valor={input => this._id_servicio = input} />
				<Input label="Solicitud Contenedor" valor={input => this._id_solicitud_padre = input} />
				<div className="btn-form">
					<button type="submit" className="btn btn-success">Agregar Solicitud</button>
				</div>
			</Formulario>
        	<TableSolicitud datos_elemento={this.props.solicitudes} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log( store.solicitudState);
  return {
    solicitudes: store.solicitudState.solicitudes,
	equipos    : store.equipoState.equipos
  };
};

export default connect(mapStateToProps)(PanelSolicitud);
