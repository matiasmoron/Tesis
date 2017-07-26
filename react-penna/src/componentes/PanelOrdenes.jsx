var React = require('react');

import * as Api from '../api/ordenes_api';
import * as ApiServicio from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import SelectInput from './genericos/Select';
// import TableOrdenes from './TableOrdenes';
import {tipoBien} from './commons/Utils';


class PanelOrdenes extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		//id_servicio seria el del login
		ApiServicio.getServicios();
		Api.getBienes({id_tipo_bien:1});
	}

	_addElemento(event){
		event.preventDefault();
		// Api.addEquipo({id_tipo_equipo:this._id_tipo_equipo.value,descripcion:this._descripcion.value,
		// 			cod_patrimonial:this._cod_patrimonial.value,id_servicio:this._id_servicio.value,
		// 			id_equipo_padre:this._id_equipo_padre.value});
    }

	_armarSelect(){
		var resultado = {};
		var resultado = Object.keys(tipoBien).map((valor) =>{
			var elem  = [];
			elem      = {
				tipo_bien :valor,
				descripcion:tipoBien[valor]
			}
			return elem;
			}
        );
		return resultado;
	}

	render() {
		var data_tipo_entidades = this._armarSelect();
	  	return (
			<div className="">
				<Formulario titulo="Nueva orden de trabajo" submit={this._addElemento.bind(this)}>
					<div className="row">
						<SelectInput clases="form-group col-md-6" data_opciones={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicios" valor={input => this._id_servicio = input} />
					</div>
					<div className="row">
						<SelectInput clases="form-group col-md-5" data_opciones={data_tipo_entidades} llave="tipo_bien" descripcion="descripcion" label="Tipo Bien"   valor={input => this._tipo_bien = input} />
						<SelectInput clases="form-group col-md-7" data_opciones={this.props.bienes} llave="id_equipo" descripcion="descripcion" label="Bien" valor={input => this._id_bien = input} />
					</div>
					<div className="row">
						<Input clases="form-group col-md-5" label="Cód. Patrimonial" valor={input => this._cod_patrimonial = input} />
					</div>
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Buscar</button>
					</div>
				</Formulario>
        		{/* <TableOrdenes datos_elemento={this.props.equipos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/> */}
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
console.log("store ordenes", store);
  return {
	  bienes   : store.ordenesState.bienes,
	  servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
