var React = require('react');

import * as Api from '../api/equipo_api';
import * as ApiServicio from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import {SelectInput,Input} from './genericos/FormElements';
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
		var promesa = Api.addEquipo({id_tipo_equipo:this._id_tipo_equipo.value,descripcion:this._descripcion.value,
					cod_patrimonial:this._cod_patrimonial.value,id_servicio:this._id_servicio.value,
					id_equipo_padre:this._id_equipo_padre.value});

		promesa.then( valor => {
			console.log("entreee");
			Api.getEquipos({id_servicio:this._id_servicio.value});
		});
    }

	_deleteElemento(id){
		Api.deleteEquipo(id);
    }
	_updateElemento(equipo){
		Api.updateEquipo(equipo);
	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getEquipos({id_servicio:this._id_servicio.value});
	}

	render() {
	  return (
		<div className="col-md-10">
			<div className="col-md-6 col-md-offset-3">
				<Formulario titulo="Creación equipo" submit={this._addElemento.bind(this)}>
					<SelectInput clases="" vacio="true" data_opciones={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicios" onChange={this.changeSelect.bind(this)} valor={input => this._id_servicio = input} />
					<Input clases="" label="Tipo equipo" valor={input => this._id_tipo_equipo = input} />
					<Input clases="" label="Descripcion" valor={input => this._descripcion = input} />
					<Input clases="" label="Código patrimonial" valor={input => this._cod_patrimonial = input} />
					<SelectInput clases="" vacio="true" data_opciones={this.props.equipos} llave="id_equipo" descripcion="cod_desc" label="Equipo Contenedor"   valor={input => this._id_equipo_padre = input} />
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar equipo</button>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
				<TableEquipo datos_elemento={this.props.equipos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
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
