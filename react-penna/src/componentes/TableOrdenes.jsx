var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from './commons/BsTable';

class TableOrdenes extends React.Component {
	 constructor() {
       super();
     }

		onAfterDeleteRow(rowKeys){
			// for (var i = 0; i < rowKeys.length; i++)
			// 	this.props.deleteElemento(rowKeys[i]);

		}
	   updateElemento(row, cellName, cellValue) {
			//    this.props.updateElemento(row);
	   }
	   customConfirm(next, dropRowKeys) {
		 const dropRowKeysStr = dropRowKeys.join(',');
		 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
		   next();
		 }
	   }

   render() {

 	   //  const editar = {
 	// 		mode: 'dbclick',
 	// 		blurToSave: true,
 	// 		afterSaveCell: this.updatePuesto.bind(this)
		//    	};

 		const opciones= {
 			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
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
				<TableHeaderColumn  dataField='id_tipo_bien'>Tipo Bien</TableHeaderColumn>
				<TableHeaderColumn dataField='descripcion'>Descripción</TableHeaderColumn>
				<TableHeaderColumn dataField='servicio_nombre'>Servicio</TableHeaderColumn>
				<TableHeaderColumn dataField='estado'>Estado</TableHeaderColumn>
				<TableHeaderColumn dataField=''>Acción</TableHeaderColumn>

			</BootstrapTable>
		 );
   }
}

export default TableOrdenes;
