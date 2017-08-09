var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
import store from '../store';
import * as Api from '../api/ordenes_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien,conformidad} from './commons/Utils';
import {Boton,TextArea,SelectInput,Label} from './genericos/FormElements';
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
				case 2:
						acciones.push(<Boton onClick={this.modalActualizarOrden.bind(this,row)} clases="btn-warning" label="Act" titulo="Modificar los datos de la orden de trabajo"/>);
				case 1:
						acciones.push(<Boton onClick={this.modalDerivarOrden.bind(this,row)} clases="btn-info" label="De" titulo="Derivar orden de trabajo"/>)
						acciones.push(<Boton onClick={this.modalAsignarOrden.bind(this,row)} clases="btn-success" label="Asig" titulo="Asignar la orden a otro técnico"/>)
				case 3:
				case 4:
				case 5:
				case 6:
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
		   this.setState({showModalAsignar : !this.state.showModalAsignar});
		   if (row!=null)
			   this.setState({datosOrden : row});
	   }

	  //Asigna la orden de trabajo a un técnico
	   AsignarOrden(){
		  var promesa = Api.asignarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,leg_recepcion:this._leg_recepcion.value});

		  promesa.then(valor => {
			   this.modalAsignarOrden();
			   this.props.getOrdenes();
		   });
	   }

		//Muestra/Oculta el modal para actualizar los datos de la orden de trabajo
		modalActualizarOrden(row=null){
			this.setState({showModalActualizar : !this.state.showModalActualizar});
 		   if (row!=null)
 			   this.setState({datosOrden : row});
		}

	  //Actualiza la orden de trabajo con los datos ingresados y cambiandole el estado a finalizado
	   guardarFinalizarOrden(){
		   	Api.actualizarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo});
	   }

		//Actualiza la orden de trabajo con los datos ingresados
	   guardarOrden(){
		   	this.actualizarOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo});
	   }


   render() {

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear
 		};

		 return (
				<div>
					<VerMasModal datosOrden={this.state.datosOrden} show={this.state.showModalVer} onHide={this.modalVerMas.bind(this)}></VerMasModal>

					<ModalBs show={this.state.showModalDerivar} onHide={this.modalDerivarOrden.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={this.props.entidades} llave="id_entidad" descripcion="nombre" label="Entidad destino" valor={input => this._entidad_destino = input} />
								<Boton onClick={this.derivarOrden.bind(this)} clases="btn-success" label="Derivar"/>
							</div>
						</div>
					</ModalBs>
					<ModalBs show={this.state.showModalAsignar} onHide={this.modalAsignarOrden.bind(this)} titulo="Asignar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={this.props.tecnicos} llave="legajo" descripcion="nombre" label="Asignar A" valor={input => this._leg_recepcion = input} />
								<Boton onClick={this.AsignarOrden.bind(this)} clases="btn-success" label="Asignar A"/>
							</div>
						</div>
					</ModalBs>
					<ModalBs show={this.state.showModalActualizar} onHide={this.modalActualizarOrden.bind(this)} titulo="Actualizar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={this.props.tecnicos} llave="legajo" descripcion="nombre" label="Asignar A" valor={input => this._leg_recepcion = input} />
								<Boton onClick={this.guardarOrden.bind(this)} clases="btn-success" label="Guardar"/>
								<Boton onClick={this.guardarFinalizarOrden.bind(this)} clases="btn-success" label="Guardar y actualizar"/>
								<Boton onClick={this.modalActualizarOrden.bind(this)} clases="btn-success" label="Cancelar"/>
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
	console.log("entidades store",store);
  return {
	  entidades     : store.entidadState.entidades,
	  tecnicos      : store.tecnicoState.tecnicos
  };
};

export default connect(mapStateToProps)(TableOrdenesAdmin);
