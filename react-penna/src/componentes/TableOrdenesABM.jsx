var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
// var Modal=require("react-bootstrap/lib/Modal");
import * as Api from '../api/ordenes_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien} from './commons/Utils';
import {Boton,TextArea,SelectInput,Label} from './genericos/FormElements';
import {ModalBs} from './genericos/ModalBs';
import {VerMasModal} from './ordenes_trabajo/templates/VerMasModal';

class TableOrdenes extends React.Component {
	 constructor() {
       super();
	   this.state = {showModalVer:false,showModalCrear:false,datosOrden:[]};
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
			if(row.estado == 1 || row.estado==2)
				acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo"><i className="fa fa-search" aria-hidden="true"></i></Boton>);
			else
				acciones.push(<Boton onClick={this.modalcrearOrden.bind(this,row)} clases="btn-success" titulo="Crear nueva orden de trabajo"><i className="fa fa-plus" aria-hidden="true"></i></Boton>);

			return (
					<div className="botonera">
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

	   modalcrearOrden(row){
		    this.setState({showModalCrear : true,  row :row});
	   }

	   cerrarCrear(){
		   	this.setState({showModalCrear : false});
	   }

		crearOrden(){
			var promesa = Api.addOrden({id_tipo_bien:this.state.row.id_tipo_bien,id_bien:this.state.row.id_bien,obs_creacion:this._observacion_creacion.value,
						'entidad_destino':this._id_entidad.value});

			promesa.then(valor => {
				Api.getBienesTablas({id_tipo_bien:this.state.row.id_tipo_bien,id_bien:this.state.row.id_bien});
				this.cerrarCrear();
			});
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
					{/* Modal ver más */}
					<VerMasModal datosOrden={this.state.datosOrden} show={this.state.showModalVer} onHide={this.modalVerMas.bind(this)}></VerMasModal>

					{/* Modal crear orden */}
					<ModalBs show={this.state.showModalCrear} onHide={this.cerrarCrear.bind(this)} titulo="Solicitar">
						<div>
							<TextArea cols="50" rows="10" valor={input => this._observacion_creacion = input}/>
							<SelectInput  data_opciones={this.props.entidades} llave="id_entidad" descripcion="nombre" label="Entidad Destino" valor={input => this._id_entidad = input} />
							<Boton onClick={this.crearOrden.bind(this)} clases="btn-success" label="Crear orden"/>
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
						<TableHeaderColumn dataField='id_tipo_bien' dataFormat={this.colTipoBien} dataSort>Tipo Bien</TableHeaderColumn>
						<TableHeaderColumn dataField='descripcion' dataSort>Descripción</TableHeaderColumn>
						<TableHeaderColumn dataField='servicio_nombre' dataSort>Servicio</TableHeaderColumn>
						<TableHeaderColumn dataField='estado' dataFormat={this.colEstado} dataSort>Estado</TableHeaderColumn>
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
