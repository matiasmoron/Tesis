var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
// var Modal=require("react-bootstrap/lib/Modal");
import * as Api from '../api/ordenes_api';
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien} from './commons/Utils';
import {Boton,TextArea,SelectInput} from './genericos/FormElements';
import {ModalBs} from './genericos/ModalBs';


class TableOrdenes extends React.Component {
	 constructor() {
       super();
	   this.state = {showModalVer:false,showModalCrear:false};
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
			if(row.estado == 1 || row.estado==2)
				return <Boton onClick={this.verMas} clases="btn-primary" label="Ver más"/>;
			else
				return <Boton onClick={this.modalcrearOrden.bind(this,row)} clases="btn-success" label="Crear orden"/>;

		}

	   verMas(){
		   console.log("muestro modal");

	   }
	   modalcrearOrden(row){
		   console.log("muestro modal");
		    this.setState({showModalCrear : true,  row :row});

	   }

	   cerrarCrear(){
			console.log("entro Cerrar");
		   	this.setState({showModalCrear : false});
	   }

		crearOrden(){
			console.log("Observacion",this._observacion_creacion.value);
			console.log("Fila",this.state.row);
			Api.addOrden({id_tipo_bien:this.state.row.id_tipo_bien,id_bien:this.state.row.id_bien,obs_creacion:this._observacion_creacion.value,
						'entidad_destino':this._id_entidad.value});
			this.setState({showModalCrear : false});
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
						<TableHeaderColumn dataField='id_tipo_bien' dataFormat={this.colTipoBien}>Tipo Bien</TableHeaderColumn>
						<TableHeaderColumn dataField='descripcion'>Descripción</TableHeaderColumn>
						<TableHeaderColumn dataField='servicio_nombre'>Servicio</TableHeaderColumn>
						<TableHeaderColumn dataField='estado' dataFormat={this.colEstado} >Estado</TableHeaderColumn>
						<TableHeaderColumn dataField='' dataFormat={this.colAccion.bind(this)} dataAlign="center">Acción</TableHeaderColumn>

					</BootstrapTable>
				</div>
		 );
   }
}

export default TableOrdenes;
