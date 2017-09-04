var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
// var BootstrapTable    = ReactBsTable.BootstrapTable;
// var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import {BootstrapTable,ExportCSVButton,TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as Api from '../api/ordenes_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien,conformidad} from './commons/Utils';
import {Boton,TextArea,SelectInput,Label} from './genericos/FormElements';
import {ModalBs} from './genericos/ModalBs';
import {VerMasModal} from './ordenes_trabajo/templates/VerMasModal';

class TableOrdenesVer extends React.Component {
	 constructor() {
       super();
	   this.state = {showModalVer:false,showModalFinalizar:false,datosOrden:[]};
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
			case 3:
					acciones.push(<Boton onClick={this.modalFinalizarOrden.bind(this,row)} clases="btn-success" label="Cerrar" titulo="Dar conformidad y cerrar orden de trabajo"><i className="fa fa-plus" aria-hidden="true"></i></Boton>)
			default:
					acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo"><i className="fa fa-search" aria-hidden="true"></i></Boton>)

		}


		return (
				<div className="botonera">
					{acciones.map((boton,i) =>
						 <span key={i}> {boton}</span>
					 )}
				</div>
		);

	}

	_dataConformidad(){
		var resultado = {};
		var resultado = Object.keys(conformidad).map((valor) =>{
			var elem  = [];
				elem      = {
					conformidad     :valor,
					descripcion:conformidad[valor]
				}
				return elem;
		});
		return resultado;
	}

	//Funciones del Modal "Ver más"
   modalVerMas(row){
		 this.setState({showModalVer :!this.state.showModalVer});
		 if (row!=null)
			 this.setState({datosOrden : row});
   }

   modalFinalizarOrden(row){
	 this.setState({showModalFinalizar :!this.state.showModalFinalizar});
	 if (row!=null)
		 this.setState({datosOrden : row});
   }

	finalizarOrden(){
		var promesa = Api.putConformidadOrden({id_orden_trabajo:this.state.row.id_orden_trabajo,conformidad:this._conformidad.value});

		promesa.then(valor => {
			Api.getOrdenes();
			this.modalFinalizarOrden();
		});
	}


   render() {

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			exportCSVBtn          : BsTable.btnXls,
			noDataText            : 'No se encontraron resultados'
 		};

		var dataConformidad = this._dataConformidad();

		return (
				<div>
					<ModalBs show={this.state.showModalFinalizar} onHide={this.modalFinalizarOrden.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={dataConformidad} llave="conformidad" descripcion="descripcion" label="Conformidad" valor={input => this._conformidad = input} />
								<Boton onClick={this.finalizarOrden.bind(this)} clases="btn-success" label="Cerrar orden"/>
							</div>
						</div>
					</ModalBs>

					<VerMasModal datosOrden={this.state.datosOrden} show={this.state.showModalVer} onHide={this.modalVerMas.bind(this)}></VerMasModal>

					<BootstrapTable
						height='auto'
						search={true}
						multiColumnSearch
						data={this.props.datos_elemento}
						deleteRow={false}
						options={opciones}
						hover
						striped
						exportCSV
						csvFileName='OrdenesTrabajo'
						pagination>
						<TableHeaderColumn  dataField='id_bien' hidden>ID</TableHeaderColumn>
						<TableHeaderColumn dataField='id_tipo_bien' dataFormat={this.colTipoBien}>Tipo Bien</TableHeaderColumn>
						<TableHeaderColumn dataField='descripcion'>Descripción</TableHeaderColumn>
						<TableHeaderColumn dataField='servicio_nombre'>Servicio</TableHeaderColumn>
						<TableHeaderColumn dataField='estado' dataFormat={this.colEstado} >Estado</TableHeaderColumn>
						<TableHeaderColumn isKey dataField='id_orden_trabajo' dataFormat={this.colAccion.bind(this)} dataAlign="center" width="10%">Acción</TableHeaderColumn>
					</BootstrapTable>
				</div>
		 );
   }
}

export default TableOrdenesVer;
