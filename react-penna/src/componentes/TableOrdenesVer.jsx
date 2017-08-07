var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
// var Modal=require("react-bootstrap/lib/Modal");
import * as Api from '../api/ordenes_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien,conformidad} from './commons/Utils';
import {Boton,TextArea,SelectInput,Label} from './genericos/FormElements';
import {ModalBs} from './genericos/ModalBs';


class TableOrdenes extends React.Component {
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
			if(row.estado == 3)
				return (
					<div className="botonera">
						<Boton onClick={this.verMas.bind(this,row)} clases="btn-primary" label="Ver más"/>
						<Boton onClick={this.modalfinalizarOrden.bind(this,row)} clases="btn-success" label="Cerrar" titulo="Dar conformidad y cerrar orden de trabajo"/>
					</div>
				);
			else
				return (
					<div className="botonera">
						<Boton onClick={this.verMas.bind(this,row)} clases="btn-primary" label="Ver más"/>
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

	   verMas(row){
		   console.log(row);
		   this.setState({showModalVer : true,datosOrden:row});
	   }
	   modalfinalizarOrden(row){
		    this.setState({showModalFinalizar : true,  row :row});
	   }

	   cerrarFinalizar(){
		   	this.setState({showModalFinalizar : false});
	   }

	   cerrarVer(){
		   	this.setState({showModalVer : false});
	   }

		finalizarOrden(){
			var promesa = Api.putConformidadOrden({id_orden_trabajo:this.state.row.id_orden_trabajo,conformidad:this._conformidad.value});

			promesa.then(valor => {
				Api.getOrdenes();
				this.cerrarFinalizar();
			});
		}


   render() {

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear
 		};

		var dataConformidad = this._dataConformidad();
		 return (
				<div>
					<ModalBs show={this.state.showModalFinalizar} onHide={this.cerrarFinalizar.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectInput clases="d-inline"  data_opciones={dataConformidad} llave="conformidad" descripcion="descripcion" label="Conformidad" valor={input => this._conformidad = input} />
								<Boton onClick={this.finalizarOrden.bind(this)} clases="btn-success" label="Cerrar orden"/>
							</div>
						</div>
					</ModalBs>
					<ModalBs show={this.state.showModalVer} onHide={this.cerrarVer.bind(this)} titulo="Detalles orden de trabajo">
						<div className="modal-body">
							<div className="row">
								<Label clases="col-md-6" label="Autor-orden" value={this.state.datosOrden.p_creacion}/>
								<Label clases="col-md-6" label="Fecha Creación" value={this.state.datosOrden.fecha_creacion}/>
							</div>
							<div className="row">
								<Label clases="col-md-6" label="Entidad destino" value={this.state.datosOrden.entidad_destino}/>
								<Label clases="col-md-6" label="Tomado por" value={this.state.datosOrden.p_recepcion}/>
							</div>
							<div className="row">
								<Label label="Observación creación" value={this.state.datosOrden.obs_creacion}/>
								<Label label="Observación devolución" value={this.state.datosOrden.obs_devolucion}/>
							</div>
							<div className="row">
								<Label label="Conformidad" value={this.state.datosOrden.conformidad}/>
							</div>
							<div className="btn-form">
								<Boton onClick={this.cerrarVer.bind(this)} clases="btn-primary" label="Cerrar"/>
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
	console.log("store",store);
  return {
	  orden : store.ordenesState.orden
  };
};

export default connect(mapStateToProps)(TableOrdenes);

{/* export default TableOrdenes; */}
