var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from '../commons/BsTable';

class TableServicio extends React.Component {
	 constructor() {
       super();
     }

	 onAfterDeleteRow(rowKeys){
		 for (var i = 0; i < rowKeys.length; i++)
			 this.props.deleteServicio(rowKeys[i]);

	 }
	updateServicio(row, cellName, cellValue) {
		//Validar
		return;
		this.props.updateServicio(row);
		ApiError.ShowError("Debe completar todos los campos para poder continuar");
	}
	customConfirm(next, dropRowKeys) {
	  const dropRowKeysStr = dropRowKeys.join(',');
	  if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	    next();
	  }
	}

	invalidClass(cell, row){
		console.log("entre");
	  return 'invalid';
	}
   render() {
	    const editar = {
			mode: 'dbclick',
			blurToSave: true,
			afterSaveCell: this.updateServicio.bind(this)
	   	};

		const opciones= {
			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
			deleteBtn             : BsTable.btnEliminar,
			searchField           : BsTable.searchField,
			handleConfirmDeleteRow: this.customConfirm,
			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
		};

		 return (
			<BootstrapTable
				height='auto'
				search={true}
				multiColumnSearch
				data={this.props.datos_elemento}
				deleteRow={true}
				selectRow={BsTable.selectFila}
				cellEdit={editar}
				options={opciones}
				hover
				striped
				pagination>
				<TableHeaderColumn isKey dataField='id_servicio'>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre' editable={ { validator: BsTable.columnRequerida } } invalidEditColumnClassName={ this.invalidClass }>Nombre</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TableServicio;
