var React = require('react');

import * as Api from '../api/equipo_api';
import * as ApiServicio from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import SelectInput from './genericos/Select';
import TableEquipo from './TableEquipo';

class PanelEquipo extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		Api.getEquipos();
		ApiServicio.getServicios();
	}


	_addElemento(event){
		event.preventDefault();
		Api.addEquipo({id_tipo_equipo:this._id_tipo_equipo.value,descripcion:this._descripcion.value,
					cod_patrimonial:this._cod_patrimonial.value,id_servicio:this._id_servicio.value,
					id_equipo_padre:this._id_equipo_padre.value});
    }

	_deleteElemento(id){
		Api.deleteEquipo(id);
    }
	_updateElemento(equipo){
		Api.updateEquipo(equipo);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación Equipo" submit={this._addElemento.bind(this)}>
				<Input clases="form-group" label="Tipo Equipo" valor={input => this._id_tipo_equipo = input} />
				<Input label="Descripcion" valor={input => this._descripcion = input} />
				<Input label="Código Patrimonial" valor={input => this._cod_patrimonial = input} />
				<Input label="Equipo Contenedor" valor={input => this._id_equipo_padre = input} />
				<SelectInput data_opciones={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicios"   valor={input => this._id_servicio = input} />
				<div className="btn-form">
					<button type="submit" className="btn btn-success">Agregar Equipo</button>
				</div>
			</Formulario>
        	<TableEquipo datos_elemento={this.props.equipos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log("store equipo", store);
  return {
    equipos: store.equipoState.equipos,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelEquipo);
