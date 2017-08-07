var React = require('react');

import * as Api from '../api/ordenes_api';
import * as ApiServicio from '../api/servicio_api';
import * as ApiEntidad from '../api/entidad_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import {SelectInput,Input,Boton} from './genericos/FormElements';
import TableOrdenesVer from './TableOrdenesVer';
import {tipoBien,estadoOrden} from './commons/Utils';
// import DatePicker from './genericos/DatePicker';


class PanelOrdenes extends React.Component {
	constructor() {
      super();
	  this.state = {disabled_cod_patrimonial :false};
    }

	//@todo cargar por defecto el servicio de login y todos los bienes que corresponden a servicio
	componentDidMount(){
		//id_servicio seria el del login
		ApiServicio.getServicios();
		Api.getBienes({id_tipo_bien:1});
		ApiEntidad.getEntidades();
		Api.getOrdenes({id_tipo_bien :1});
	}

	_getOrdenesTabla(event){
		event.preventDefault();
		Api.getOrdenes({
							id_tipo_bien   :this._id_tipo_bien.value,
							id_servicio    :this._id_servicio.value,
							id_entidad     :this._id_entidad.value,
							id_bien        :this._id_bien.value,
							cod_patrimonial:this._cod_patrimonial.value,
							fecha_ini      :this._fecha_ini.value,
							fecha_fin      :this._fecha_fin.value,
							estado         :this._estado.value
						});
    }

	_dataTipoBienes(){
		var resultado = {};
		var resultado = Object.keys(tipoBien).map((valor) =>{
			var elem  = [];
			elem      = {
				tipo_bien  :valor,
				descripcion:tipoBien[valor]
			}
			return elem;
			}
        );
		return resultado;
	}
	_dataEstados(){
		var resultado = {};
		var resultado = Object.keys(estadoOrden).map((valor) =>{
			var elem  = [];
				elem      = {
					estado     :valor,
					descripcion:estadoOrden[valor]
				}
				return elem;
		});
		//Elimino el estado Disponible
		resultado = resultado.splice(1);
		return resultado;
	}

	changeSelect(event){
		// Habilita/Desabilita el input de cod_patrimonial
		this.setState({ disabled_cod_patrimonial: this._id_tipo_bien.value == 2 ? true : false});
		Api.getBienes({id_tipo_bien:this._id_tipo_bien.value,id_servicio:this._id_servicio.value});
	}

	// changeDatepicker(valor,formattedValue){
	// 	console.log("date",valor);
	// 	console.log(formattedValue);
	// }

	render() {
		var data_tipo_bienes = this._dataTipoBienes();
		var data_estados = this._dataEstados();
	  	return (
			<div className="col-md-10">
				<div className="col-md-6 col-md-offset-3">
					<Formulario titulo="Ver ordenes de trabajo" submit={this._getOrdenesTabla.bind(this)}>
						<div className="row">
							<SelectInput todos="true" clases="form-group col-md-6" onChange={this.changeSelect.bind(this)} data_opciones={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicios" valor={input => this._id_servicio = input} />
							<SelectInput todos="true" clases="form-group col-md-6" data_opciones={this.props.entidades} llave="id_entidad" descripcion="nombre" label="Entidad destino" valor={input => this._id_entidad = input} />
						</div>
						<div className="row">
							<SelectInput clases="form-group col-md-5"  onChange={this.changeSelect.bind(this)} data_opciones={data_tipo_bienes} llave="tipo_bien" descripcion="descripcion" label="Tipo bien" valor={input => this._id_tipo_bien = input} />
							<SelectInput todos="true" clases="form-group col-md-7" data_opciones={this.props.bienes} llave="id_equipo" descripcion="descripcion" label="Bien" valor={input => this._id_bien = input} />
						</div>
						<div className="row">
							<Input clases="form-group col-md-5" label="Fecha inicio (creación)" valor={input => this._fecha_ini = input} />
							<Input clases="form-group col-md-5" label="Fecha fin (creación)" valor={input => this._fecha_fin = input} />
						</div>
						<div className="row">
							<Input clases="form-group col-md-5" disabled = {this.state.disabled_cod_patrimonial} label="Cód. Patrimonial" valor={input => this._cod_patrimonial = input} />
						</div>
						<div className="row">
							<SelectInput todos="true" clases="form-group col-md-5" data_opciones={data_estados} llave="estado" descripcion="descripcion" label="Estado" valor={input => this._estado = input} />
						</div>
						<div className="btn-form">
							<Boton clases="btn-primary" label="Buscar"/>
						</div>
					</Formulario>
				</div>
				<div className="col-md-12">
        			<TableOrdenesVer datos_elemento={this.props.ordenes_tabla} getOrdenes = {this._getOrdenesTabla.bind(this)}/>
				</div>
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
	// console.log("store",store);
  return {
	  bienes   	   : store.ordenesState.bienes,
	  ordenes_tabla : store.ordenesState.ordenes_tabla,
	  servicios    : store.servicioState.servicios,
	  entidades    : store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
