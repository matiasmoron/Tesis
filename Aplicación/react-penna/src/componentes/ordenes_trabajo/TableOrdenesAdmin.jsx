var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
import store from '../../store';
import * as Api from '../../api/ordenes_api';
import * as ApiTecnico from '../../api/tecnico_api';
import * as ApiEntidad from '../../api/entidad_api';
import * as BsTable from '../commons/BsTable';
import {estadoOrden,tipoBien,conformidad,prioridad} from '../commons/Utils';
import {Boton,TextArea,Label,Input2,habilitarSubmit} from '../genericos/FormElements';
import SelectChosen from '../genericos/SelectChosen';
import {ModalBs} from '../genericos/ModalBs';
import {VerMasModal} from './templates/VerMasModal';
import {showMsg} from '../../api/msg_alert_api'

class TableOrdenesAdmin extends React.Component {
	constructor() {
		super();
		this.state = {
						showModalVer        : false,
						showModalDerivar    : false,
						showModalAsignar    : false,
						showModalActualizar : false,
						datosOrden          : [],
						validatorDerivar    : this.initValidatorDerivar(),
						validatorActualizar : this.initValidatorActualizar(),
						validatorAsignar    : this.initValidatorAsignar()
					};
	 }

	 componentDidMount(){
 		ApiEntidad.getEntidades();
 	}


	initValidatorDerivar(){
		 return {
			 id_entidad_destino:{
				 required : true
			 }
		 }
	}
	initValidatorActualizar(){
		return {
			leg_recepcion:{
			   required : true
		   },
		   hs_insumidas:{
			   required:true,
			   numeric:true
		   },
		   obs_devolucion:{
			   required:true
		   }
	   }
	}
	initValidatorAsignar(){
	   return {
		   leg_recepcion:{
			   required : true
		   }
	   }
	}

	customConfirm(next, dropRowKeys) {
		const dropRowKeysStr = dropRowKeys.join(',');
		if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
			next();
		}
	}

	colEstado(estado,row){
		let clase="";

		 switch (String(row.estado)) {
			 case "1":
				 clase='t-error';
				 break;
			 case "2":
				 clase='t-orange';
				 break;
			 case "3":
				 clase='t-ok';
				 break;
		 }
		return '<span class='+clase+' title="'+estadoOrden[estado]+'"><b>'+estadoOrden[estado]+'</b></span>';
	  }

	colTipoBien(tBien,row){
	   return '<span class="">'+tipoBien[tBien]+'</span>';
	}

	colAccion(estado,row){
		let acciones=[];
		switch (String(row.estado)) {
			case "2"://En curso
					acciones.push(<Boton onClick={this.modalActualizarOrden.bind(this,row)} clases="btn-warning" titulo="Modificar los datos de la orden de trabajo" icon="fa fa-pencil"></Boton>);
			case "1"://Pendiente
					acciones.push(<Boton onClick={this.modalDerivarOrden.bind(this,row)}     clases="btn-info"    titulo="Derivar orden de trabajo" icon="fa fa-reply"></Boton>)
					acciones.push(<Boton onClick={this.modalAsignarOrden.bind(this,row)}     clases="btn-success" titulo="Asignar la orden a otro técnico" icon="fa fa-plus"></Boton>)
			case "3"://Resuelta
			case "4"://Finalizada
			case "5"://Cancelada por usuario
			case "6"://Cancelada por técnico
					acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo" icon="fa fa-search"></Boton>)

		}
		return (
				<div >
					{acciones.map((boton,i) =>
						 <span key={i}> {boton}</span>
					 )}
				</div>
		);

	}

	//Funciones del Modal "Ver más"
	modalVerMas(row){
		this.setState({showModalVer :!this.state.showModalVer});
		if (row!=null)
			this.setState({datosOrden : row});
	}

	//Muestra/Oculta el modal de derivar orden guardando los datos de la fila segun corresponda
	modalDerivarOrden(row=null){
		this.setState({showModalDerivar : !this.state.showModalDerivar});
		if (row!=null)
			this.setState({datosOrden : row});
	}

	//Muestra/Oculta el modal de actualizar orden guardando los datos de la fila segun corresponda
	modalActualizarOrden(row=null){
		this.setState({showModalActualizar : !this.state.showModalActualizar});
		 if (row!=null)
			 this.setState({datosOrden : row});
	}

	//Muestra/Oculta el modal de tomar orden guardando los datos de la fila segun corresponda
	modalAsignarOrden(row=null){
		if(!this.state.showModalAsignar){// Si se abre el modal de asignar
			const not_this=this;
			const prom = new Promise(function(resolve, reject) {
				not_this.setState({datosOrden : row});
				resolve(1);
			});
			prom.then(valor=>{
				const promesa= ApiTecnico.getTecnicoEntidadTable({id_entidad:this.state.datosOrden.id_entidad_destino});
				promesa.then(valor => {
					this.setState({showModalAsignar : !this.state.showModalAsignar});
				});
			});
		}
		else{
			this.setState({showModalAsignar : !this.state.showModalAsignar});
		}
	}

	//Action generada al presionar el boton "derivar" en el modal
	derivarOrden(){
		let obj = this.state.validatorDerivar;
		habilitarSubmit(obj,this.callbackDerivarOrden.bind(this));
	}

	callbackDerivarOrden(){
		var promesa = Api.derivarOrden({
										id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
										entidad_destino:this._entidad_destino.value
									});

		promesa.then(valor => {
			this.modalDerivarOrden();
			this.props.getOrdenes();
			showMsg("La orden de trabajo fué derivada correctamente a "+this._entidad_destino.label,"ok");

		});
	}

	//Valida los campos y llama al asignar orden
	asignarOrden(){
		let obj = this.state.validatorAsignar;
		habilitarSubmit(obj,this.callbackAsignarOrden.bind(this));
	}

	//Asigna la orden de trabajo a un técnico elegido
	callbackAsignarOrden(){
		var promesa = Api.asignarOrden({
										id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
										leg_recepcion:this._leg_recepcion.value
									});

		promesa.then(valor => {
			this.props.getOrdenes();
			this.modalAsignarOrden();
			showMsg("La orden de trabajo fué asignada correctamente al legajo: "+this._leg_recepcion.value,"ok");
			this.setState({validatorAsignar:this.initValidatorAsignar()});
		});
	}

	//Valida los campos y llama para finalizar la orden
	finalizarOrden(){
		let obj = this.state.validatorActualizar;
		habilitarSubmit(obj,this.callbackFinalizarOrden.bind(this));
	}
	//Actualiza la orden de trabajo con los datos ingresados y cambiandole el estado a finalizado
	callbackFinalizarOrden(){
		const promesa=Api.actualizarOrden({
  								id_orden_trabajo: this.state.datosOrden.id_orden_trabajo,
  								hs_insumidas    : this._hs_insumidas.value,
  								prioridad       : this._prioridad.value,
  								obs_devolucion  : this._obs_devolucion.value

  							});
  		promesa.then(valor => {
  			const promesa2 = Api.actualizarEstadoOrden({
  				id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
  				estado          : 3
  			});
  			promesa2.then(valor => {
  				this.props.getOrdenes();
  				this.modalActualizarOrden();
				showMsg("Se dio por finalizada la orden de trabajo","ok");
				this.setState({validatorActualizar:this.initValidatorActualizar()});
  			});
  		 });
	}

	//Actualiza la orden de trabajo con los datos ingresados
	actualizarOrden(){
		let obj = this.state.validatorActualizar;
		habilitarSubmit(obj,this.callbackActualizarOrden.bind(this));
	}

	callbackActualizarOrden(){
		var promesa=Api.actualizarOrden({
								id_orden_trabajo: this.state.datosOrden.id_orden_trabajo,
								hs_insumidas    : this._hs_insumidas.value,
								prioridad       : this._prioridad.value,
								obs_devolucion  : this._obs_devolucion.value
							});
		promesa.then(valor => {
			this.props.getOrdenes();
			this.modalActualizarOrden();
			showMsg("La orden de trabajo se actualizó correctamente","ok");
			this.setState({validatorActualizar:this.initValidatorActualizar()});
		});
	}

	_dataPrioridades(){
		var resultado = {};
		var resultado = Object.keys(prioridad).map((valor) =>{
			var elem  = [];
				elem      = {
					prioridad  : valor,
					descripcion: prioridad[valor]
				}
				return elem;
		});
		return resultado;
	}

   render() {

		const opciones = {
			searchField           : BsTable.searchField,
			handleConfirmDeleteRow: this.customConfirm,
			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
		};

		var data_prioridades = this._dataPrioridades();
		return (
				<div>

					{/* Modal ver más */}
					<VerMasModal
						datosOrden = {this.state.datosOrden}
						show       = {this.state.showModalVer}
						onHide     = {this.modalVerMas.bind(this)}>
					</VerMasModal>

					{/* Modal derivar */}
					<ModalBs show={this.state.showModalDerivar} onHide={this.modalDerivarOrden.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectChosen
									label       = "Entidad destino"
									valor       = {input => this._entidad_destino = input}
									defaultVal  = {this.state.datosOrden.id_entidad_destino}
									data        = {this.props.entidades}
									llave       = "id_entidad"
									clearable   = {false}
									descripcion = "nombre"
									validator   = {this.state.validatorDerivar.id_entidad_destino}
									cambiar     = {p1    => this.setState({validatorDerivar :Object.assign({}, this.state.validatorDerivar,{id_entidad_destino:p1})})}
								/>
								<div className="btn-form">
									<Boton
										label="Derivar"
										onClick={this.derivarOrden.bind(this)}
										clases="btn-success"
									/>
								</div>
							</div>
						</div>
					</ModalBs>

					{/* Modal asignar */}
					<ModalBs show={this.state.showModalAsignar} onHide={this.modalAsignarOrden.bind(this)} titulo="Asignar" >
						<div className="modal-body">
							<div className="form-group row">
								<SelectChosen
									label       = "Asignar A"
									defaultVal  = {this.state.datosOrden.leg_recepcion}
									data        = {this.props.tecnicos_entidad_table}
									llave       = "legajo"
									descripcion = "nombre_apellido"
									valor       = {input => { this._leg_recepcion = input;}}
									validator   = {this.state.validatorAsignar.leg_recepcion}
									cambiar     = {p1    => this.setState({validatorAsignar :Object.assign({}, this.state.validatorAsignar,{leg_recepcion:p1})})}
								/>
								<div className="btn-form">
									<Boton
										label   = "Asignar A"
										onClick = {this.asignarOrden.bind(this)}
										clases  = "btn-success"
									/>
								</div>
							</div>
						</div>
					</ModalBs>

					{/* Modal actualizar */}
					<ModalBs show={this.state.showModalActualizar} onHide={this.modalActualizarOrden.bind(this)} titulo="Actualizar orden de trabajo">
						<div className="modal-body">
							<div className="row">
								<SelectChosen
									label       = "Prioridad"
									clases      = "col-md-6"
									clearable   = {false}
									defaultVal  = {this.state.datosOrden.prioridad}
									data        = {data_prioridades} llave  = "prioridad"
									descripcion = "descripcion"
									valor       = {input => this._prioridad = input}
									validator   = {this.state.validatorActualizar.leg_recepcion}
									cambiar     = {p1    => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{leg_recepcion:p1})})}
								/>
							</div>
							<div className="row">
								<Input2
									label     = "Tiempo dedicado"
									clases    = "col-md-4"
									valor     = {input => this._hs_insumidas = input}
									validator = {this.state.validatorActualizar.hs_insumidas}
									cambiar   = {p1    => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{hs_insumidas:p1})})}
								/>
								<Label
									label  = "Total hs"
									clases = "col-md-4"
									value  = {this.state.datosOrden.hs_insumidas}
								/>
							</div>
							<div className="row">
								<TextArea
									label     = "Obs devolución"
									rows      = "3"
									clases    = "col-md-12"
									value     = {this.state.datosOrden.obs_devolucion}
									valor     = {input => this._obs_devolucion = input}
									validator = {this.state.validatorActualizar.obs_devolucion}
									cambiar   = {p1    => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{obs_devolucion:p1})})}
								/>
							</div>
							<div className="btn-form">
								<Boton
									label   = "Cancelar"
									onClick = {this.modalActualizarOrden.bind(this)}
									clases  = "btn-danger"
									icon    = "fa fa-times"
								/>
								<Boton
									label   = "Actualizar"
									onClick = {this.actualizarOrden.bind(this)}
									clases  = "btn-warning"
									icon    = "fa fa-check"
								/>
								<Boton
									label   = "Guardar y finalizar"
									onClick = {this.finalizarOrden.bind(this)}
									clases  = "btn-success"
									icon    = "fa fa-check"
								/>
							</div>
						</div>
					</ModalBs>

					<BootstrapTable
						height    = 'auto'
						search    = {true}
						data      = {this.props.datos_elemento}
						deleteRow = {false}
						options   = {opciones}
						hover>
						<TableHeaderColumn isKey
							dataField='id_orden_trabajo'
							hidden>ID
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='id_tipo_bien'
							dataFormat={this.colTipoBien}
							dataSort
							columnTitle>Tipo Bien
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='descripcion'
							columnTitle>Descripción
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='servicio_nombre'
							dataSort
							columnTitle>Servicio
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='estado'
							dataFormat={this.colEstado}
							dataSort
							columnTitle>Estado
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField  = 'id_orden_trabajo'
							dataFormat = {this.colAccion.bind(this)}
							dataAlign  = "center">Acción
						</TableHeaderColumn>
					</BootstrapTable>
				</div>
		 );
   }
}

const mapStateToProps = function(store) {
  return {
	  entidades              : store.entidadState.entidades,
	  tecnicos_entidad_table : store.tecnicoState.tecnicos_entidad_table
  };
};

export default connect(mapStateToProps)(TableOrdenesAdmin);
