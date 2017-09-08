var React = require('react');

import * as Api from '../api/ordenes_api';
import * as ApiServicio from '../api/servicio_api';
import * as ApiEntidad from '../api/entidad_api';
import { connect } from 'react-redux';
import store from '../store';
import {SelectInput,Input,Boton,Formulario} from './genericos/FormElements';
import TableOrdenesVer from './TableOrdenesVer';
import {tipoBien,estadoOrden} from './commons/Utils';
import SelectChosen from './genericos/SelectChosen';

class PanelOrdenes extends React.Component {
	constructor() {
      super();
	  this.state = {disabled_cod_patrimonial :false,id_tbien_def: "1",id_serv_def:"1"}; //@TODO después el id_servicio es el del usuario
    }

	//@todo cargar por defecto el servicio de login y todos los bienes que corresponden a servicio
	componentDidMount(){
		//id_servicio seria el del login
		ApiServicio.getServicios();
		Api.getBienes({id_tipo_bien:this.state.id_tbien_def,id_servicio:this.state.id_serv_def});
		ApiEntidad.getEntidades();
		Api.resetTabla();
	}

	getOrdenesTabla(){
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

	//Arma los datos del select para los tipos de bienes
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

	//Arma los datos del select para los estados de las ordenes de trabajo excluyendo el estado disponible
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

	//Obtiene los bienes según el tipo bien seleccionado y deshabilita  el código patrimonial en caso de elegir un tipo servicio
	changeSelect(event){
		console.log("ENTRO CHANGE");
		// Habilita/Desabilita el input de cod_patrimonial
		this.setState({ disabled_cod_patrimonial: this._id_tipo_bien.value == 2 ? true : false});
		Api.getBienes({id_tipo_bien:this._id_tipo_bien.value,id_servicio:this._id_servicio.value});
	}

	// changeDatepicker(valor,formattedValue){
	// 	console.log("date",valor);
	// 	console.log(formattedValue);
	// }

	render() {
		let data_tipo_bienes = this._dataTipoBienes();
		let data_estados = this._dataEstados();
	  	return (
			<div className="col-md-10">
				<div className="col-md-8 col-md-offset-2">
					<Formulario titulo="Ver órdenes de trabajo" submit={(event)=>{ event.preventDefault();this.getOrdenesTabla()}}>
						<div className="row">
							<SelectChosen llave="id_servicio" descripcion="nombre" label="Servicios" clearable={false} clases="form-group col-md-6" onChange={this.changeSelect.bind(this)} data={this.props.servicios} valor={input => this._id_servicio = input}/>
							<SelectChosen llave="id_entidad" descripcion="nombre" label="Entidad destino" clases="form-group col-md-6" data={this.props.entidades} valor={input => this._id_entidad = input}/>
						</div>
						<div className="row">
							<SelectChosen llave="tipo_bien" descripcion="descripcion" label="Tipo bien" clearable={false} defaultVal={this.state.id_tbien_def} clases="form-group col-md-5" onChange={this.changeSelect.bind(this)} data={data_tipo_bienes} valor={input => this._id_tipo_bien = input}/>
							<SelectChosen llave="id_bien" descripcion="descripcion" label="Bien" clases="form-group col-md-7" data={this.props.bienes} valor={input => this._id_bien = input}/>
						</div>
						<div className="row">
							<Input clases="form-group col-md-5" label="Fecha inicio (creación)" valor={input => this._fecha_ini = input} />
							<Input clases="form-group col-md-5" label="Fecha fin (creación)" valor={input => this._fecha_fin = input} />
						</div>
						<div className="row">
							<SelectChosen llave="estado" descripcion="descripcion" label="Estado" multi={true} clases="form-group col-md-5" data={data_estados} valor={input => this._estado = input}/>
							<Input clases="form-group col-md-5" disabled = {this.state.disabled_cod_patrimonial} label="Cód. Patrimonial" valor={input => this._cod_patrimonial = input} />
						</div>
						<div className="row">
						</div>
						<div className="btn-form">
							<Boton clases="btn btn-primary" label="Buscar"/>
						</div>
					</Formulario>
				</div>
				<div className="col-md-12">
        			<TableOrdenesVer datos_elemento={this.props.ordenes_tabla} getOrdenes = {this.getOrdenesTabla.bind(this)}/>
				</div>
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
  return {
	  bienes   	   : store.ordenesState.bienes,
	  ordenes_tabla : store.ordenesState.datos_tabla,
	  servicios    : store.servicioState.servicios,
	  entidades    : store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
