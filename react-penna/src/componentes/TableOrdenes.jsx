var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from './commons/BsTable';
import {estadoOrden,tipoBien} from './commons/Utils';
import {Boton} from './genericos/FormElements';


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
				return <Boton onClick={this.crearOrden} clases="btn-success" label="Crear orden"/>;

		}

	   verMas(){
		   console.log("muestro modal");

	   }
	   crearOrden(){
		   console.log("muestro modal");
	   }

   render() {

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear
 		};

		 return (
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
		 );
   }
}

export default TableOrdenes;
