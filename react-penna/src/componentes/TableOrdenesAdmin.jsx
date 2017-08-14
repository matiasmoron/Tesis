var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
import store from '../store';
import * as Api from '../api/ordenes_api';
import * as ApiTecnico from '../api/tecnico_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien,conformidad,prioridad} from './commons/Utils';
import {Boton,TextArea,SelectInput,Label,Input} from './genericos/FormElements';
import {ModalBs} from './genericos/ModalBs';
import {VerMasModal} from './ordenes_trabajo/templates/VerMasModal';


class TableOrdenesAdmin extends React.Component {
	 constructor() {
       super();
	   this.state = {showModalVer:false,showModalDerivar:false,showModalAsignar:false,showModalActualizar:false,datosOrden:[]};
     }

	   customConfirm(next, dropRowKeys) {
		 const dropRowKeysStr = dropRowKeys.join(',');
		 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
		   next();
		 }
	   }

	   colEstado(estado,row){
			var clase = (row.estado == 1 || row.estado==2) ? 'text-danger' : 'text-success';
		   	return '<span class='+clase+'><b>'+estadoOrden[estado]+'</b></span>';
	   }

	   colTipoBien(tBien,row){
		   return '<span class="">'+tipoBien[tBien]+'</span>';
	   }

	   colAccion(estado,row){
			var acciones=[];
			switch (row.estado) {
				case 2://En curso
				case 1://Pendiente
						acciones.push(<Boton onClick={this.modalActualizarOrden.bind(this,row)} clases="btn-warning" label="Act" titulo="Modificar los datos de la orden de trabajo"/>);
						acciones.push(<Boton onClick={this.modalDerivarOrden.bind(this,row)} clases="btn-info" label="Der" titulo="Derivar orden de trabajo"/>)
						acciones.push(<Boton onClick={this.modalAsignarOrden.bind(this,row)} clases="btn-success" label="Asig" titulo="Asignar la orden a otro técnico"/>)
				case 3://Resuelta
				case 4://Finalizada
				case 5://Cancelada por usuario
				case 6://Cancelada por técnico
						acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" label="Ver" titulo="Ver datos adicionales de la orden de trabajo"/>)

			}
			return (
					<div >
						{acciones}
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

		//Action generada al presionar el boton "derivar" en el modal
	   derivarOrden(){
		   var promesa = Api.derivarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,entidad_destino:this._entidad_destino.value});

		   promesa.then(valor => {
				this.modalDerivarOrden();
				this.props.getOrdenes();
			});
	   }


	  //Muestra/Oculta el modal de tomar orden guardando los datos de la fila segun corresponda
	   modalAsignarOrden(row=null){
		   if(!this.state.showModalAsignar) {// Si se abre el modal de asignar
			   var promesa= ApiTecnico.getTecnicoEntidadTable({id_entidad:row.id_entidad_destino});
			   promesa.then(valor => {
					this.setState({showModalAsignar : !this.state.showModalAsignar});
					this.setState({datosOrden : row});
				});

		   }
		   else{
			   this.setState({showModalAsignar : !this.state.showModalAsignar});
		   }
	   }

	  //Asigna la orden de trabajo a un técnico
	   AsignarOrden(){
		  var promesa = Api.asignarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,leg_recepcion:this._leg_recepcion.value});

		  promesa.then(valor => {
			   this.props.getOrdenes();
		   });
	   }

	//Actualiza la orden de trabajo con los datos ingresados y cambiandole el estado a finalizado
	finalizarOrden(){

	   	Api.actualizarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo});
	}

	//Actualiza la orden de trabajo con los datos ingresados
	actualizarOrden(){
		var promesa=Api.actualizarOrden({
								id_orden_trabajo: this.state.datosOrden.id_orden_trabajo,
								prioridad       : this._prioridad.value,
								hs_insumidas    : this._hs_insumidas.value,
								obs_devolucion  : this._obs_devolucion.value
							});
		promesa.then(valor => {
			 this.modalAsignarOrden();
			 this.props.getOrdenes();
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

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear
 		};

		var data_prioridades = this._dataPrioridades();

		return (
				<div>

					{/* Modal ver más */}
					<VerMasModal datosOrden={this.state.datosOrden} show={this.state.showModalVer} onHide={this.modalVerMas.bind(this)}></VerMasModal>

					{/* Modal derivar */}
					<ModalBs show={this.state.showModalDerivar} onHide={this.modalDerivarOrden.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={this.props.entidades} llave="id_entidad" descripcion="nombre" label="Entidad destino" valor={input => this._entidad_destino = input} />
								<Boton onClick={this.derivarOrden.bind(this)} clases="btn-success" label="Derivar"/>
							</div>
						</div>
					</ModalBs>

					{/* Modal asignar */}
					<ModalBs show={this.state.showModalAsignar} onHide={this.modalAsignarOrden.bind(this)} titulo="Asignar" >
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={this.props.tecnicos_entidad_table} llave="legajo" descripcion="nombre_apellido" label="Asignar A" valor={input => this._leg_recepcion = input} />
								<Boton onClick={this.AsignarOrden.bind(this)} clases="btn-success" label="Asignar A"/>
							</div>
						</div>
					</ModalBs>

					{/* Modal actualizar */}
					<ModalBs show={this.state.showModalActualizar} onHide={this.modalActualizarOrden.bind(this)} titulo="Actualizar orden de trabajo">
						<div className="modal-body">
							<div className="row">
								<SelectInput clases="col-md-4"  data_opciones={data_prioridades} llave="prioridad" descripcion="descripcion" label="Prioridad" valor={input => this._prioridad = input} />
							</div>
							<div className="row">
								<Input clases="col-md-4" label="Tiempo dedicado" valor={input => this._hs_insumidas = input} />
								<Label clases="col-md-4" label="Total hs" value="Total hs"/>
							</div>
							<div className="row">
								<TextArea rows="3" clases="col-md-12" label="Obs devolución"  valor={input => this._obs_devolucion = input} />
							</div>
							<div className="btn-form">
								<Boton onClick={this.actualizarOrden.bind(this)} clases="btn-warning" label="Actualizar"/>
								<Boton onClick={this.finalizarOrden.bind(this)} clases="btn-success" label="Guardar y finalizar"/>
								<Boton onClick={this.modalActualizarOrden.bind(this)} clases="btn-danger" label="Cancelar"/>
							</div>
						</div>
					</ModalBs>

					<BootstrapTable
						height='auto'
						search={true}
						data={this.props.datos_elemento}
						deleteRow={false}
						options={opciones}
						hover>
						<TableHeaderColumn isKey dataField='id_bien' hidden>ID</TableHeaderColumn>
						<TableHeaderColumn dataField='id_tipo_bien' dataFormat={this.colTipoBien}>Tipo Bien</TableHeaderColumn>
						<TableHeaderColumn dataField='descripcion'>Descripción</TableHeaderColumn>
						<TableHeaderColumn dataField='servicio_nombre'>Servicio</TableHeaderColumn>
						<TableHeaderColumn dataField='estado' dataFormat={this.colEstado} >Estado</TableHeaderColumn>
						<TableHeaderColumn dataField='id_orden_trabajo' dataFormat={this.colAccion.bind(this)} dataAlign="center">Acción</TableHeaderColumn>
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
