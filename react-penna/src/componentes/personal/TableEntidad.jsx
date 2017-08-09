var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import {tipoEntidad} from '../commons/Utils';
import * as BsTable from '../commons/BsTable';

class TableEntidad extends React.Component {
	 constructor() {
       super();
     }

	onAfterDeleteRow(rowKeys){
		console.log("asdfasd");
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deleteEntidad(rowKeys[i]);

	}
   updateEntidad(row, cellName, cellValue) {
		   this.props.updateEntidad(row);
   }
   customConfirm(next, dropRowKeys) {
	 const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
   }

	tipoEntidadFormatter(cell, row) {
      return tipoEntidad[cell];
	}

   render() {

 	    const editar = {
 			mode         : 'dbclick',
 			blurToSave   : true,
 			afterSaveCell: this.updateEntidad.bind(this)
 	   	};

 		const opciones= {
 			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
 			deleteBtn             : BsTable.btnEliminar,
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear
 		}
		 return (
			<BootstrapTable
				height    = 'auto'
				search    = {true}
				data      = {this.props.datos_elemento}
				deleteRow = {true}
				selectRow = {BsTable.selectFila}
				cellEdit  = {editar}
				options   = {opciones}
				hover>
				<TableHeaderColumn editable={false} isKey dataField='id_entidad' hidden>ID</TableHeaderColumn>
				<TableHeaderColumn
					 dataFormat={ this.tipoEntidadFormatter}
					 editable={false}
					 dataField='tipo_entidad'>
					 Tipo entidad
				</TableHeaderColumn>
				<TableHeaderColumn editable={true} dataField='nombre'>Nombre</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TableEntidad;