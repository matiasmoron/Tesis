var React = require('react');

import * as Api from '../api/ordenes_api';
import * as ApiServicio from '../api/servicio_api';
import * as entidadApi from '../api/entidad_api';
import { connect } from 'react-redux';
import store from '../store';
import {SelectInput,Input,Formulario} from './genericos/FormElements';
import TableOrdenesABM from './TableOrdenesABM';
import {tipoBien} from './commons/Utils';
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
		Api.resetTabla();
		entidadApi.getEntidades();
	}

	_getBienesTablas(event){
		console.log("ENTRO BIENES TABLAS");
		event.preventDefault();
		Api.getBienesTablas({id_tipo_bien:this._id_tipo_bien.value,id_servicio:this._id_servicio.value,id_bien:this._id_bien.value,
							cod_patrimonial:this._cod_patrimonial.value});
    }

	_dataTipoBienes(){
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

	changeSelect(event){
		// Habilita/Desabilita el input de cod_patrimonial
		this.setState({ disabled_cod_patrimonial: this._id_tipo_bien.value == 2 ? true : false});
		Api.getBienes({id_tipo_bien:this._id_tipo_bien.value,id_servicio:this._id_servicio.value});
	}

	render() {
		var data_tipo_bienes = this._dataTipoBienes();
	  	return (
			<div className="col-md-10">
				<div className="col-md-8 col-md-offset-2">
					<Formulario titulo="Nueva orden de trabajo" submit={this._getBienesTablas.bind(this)}>
						<div className="row">
							<SelectChosen llave="id_servicio" descripcion="nombre" label="Servicios" clearable={false} clases="form-group col-md-6" onChange={this.changeSelect.bind(this)} data={this.props.servicios} valor={input => this._id_servicio = input}/>
						</div>
						<div className="row">
							<SelectChosen llave="tipo_bien" descripcion="descripcion" label="Tipo Bien" clases="form-group col-md-5" clearable={false} defaultVal={this.state.id_tbien_def} onChange={this.changeSelect.bind(this)} data={data_tipo_bienes} valor={input => this._id_tipo_bien = input}/>
							<SelectChosen llave="id_bien" descripcion="descripcion" label="Bien" clases="form-group col-md-7" onChange={this.changeSelect.bind(this)} data={this.props.bienes} valor={input => this._id_bien = input}/>
						</div>
						<div className="row">
							<Input clases="form-group col-md-5" disabled = {this.state.disabled_cod_patrimonial} label="Cód. Patrimonial" valor={input => this._cod_patrimonial = input} />
						</div>
						<div className="btn-form">
							<button type="submit" className="btn btn-success">Buscar</button>
						</div>
					</Formulario>
				</div>
				<div className="col-md-12">
        			<TableOrdenesABM datos_elemento={this.props.bienes_tabla} entidades={this.props.entidades} />
				</div>
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
	console.log("store",store);
  return {
	  bienes   	   : store.ordenesState.bienes,
	  bienes_tabla : store.ordenesState.datos_tabla,
	  servicios    : store.servicioState.servicios,
	  entidades    : store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
