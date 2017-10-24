var React = require('react');

import * as Api from '../../api/equipo_api';
import * as ApiServicio from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import {SelectInput,Input,PopOver,Formulario} from '../genericos/FormElements';
import TableEquipo from './TableEquipo';
import SelectChosen from '../genericos/SelectChosen';

// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select/dist/react-select.css';
require("../../styles/select.scss");

class PanelEquipo extends React.Component {
	constructor() {
      super();
	  this.state = {value:''};
    }
	componentDidMount(){
		Api.getEquipos();
		ApiServicio.getServicios();
	}


	_addElemento(event){
		event.preventDefault();
		var promesa = Api.addEquipo({
						id_tipo_equipo :1,
						descripcion    :this._descripcion.value,
						cod_patrimonial:this._cod_patrimonial.value,
						id_servicio    :this._id_servicio.value,
						id_equipo_padre:this._id_equipo_padre.value});

		promesa.then( valor => {
			Api.getEquipos({id_servicio:this._id_servicio.value});
		});
    }

	_deleteElemento(id){
		Api.deleteEquipo({id_bien:id});
    }
	_updateElemento(equipo){
		Api.updateEquipo({
							id_bien        :equipo['id_bien'],
							cod_patrimonial:equipo['cod_patrimonial'],
							descripcion    :equipo['descripcion']
					});
	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getEquipos({id_servicio:this._id_servicio.value});
	}


	render() {
	  return (
		<div className="col-md-8">
			<div className="col-md-6 col-md-offset-3">
				<Formulario titulo="Creación equipo" submit={this._addElemento.bind(this)}>
					<SelectChosen  llave="id_servicio" descripcion="nombre" label="Servicios" onChange={this.changeSelect.bind(this)} data={this.props.servicios} valor={input => this._id_servicio = input}/>
					<Input clases="" label="Tipo equipo" valor={input => this._id_tipo_equipo = input} disabled/>
					<div className="row">
						<Input clases="col-md-8" label="Descripcion" valor={input => this._descripcion = input} />
					</div>
					<div className="row">
						<Input clases="col-md-8" label="Código patrimonial" valor={input => this._cod_patrimonial = input} />
					</div>
					<SelectChosen llave="id_bien" descripcion="cod_desc" label="Equipo Contenedor" data={this.props.equipos} valor={input => this._id_equipo_padre = input}/>
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
