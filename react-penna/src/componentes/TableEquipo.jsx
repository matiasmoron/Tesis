var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from './commons/BsTable';

class TableEquipo extends React.Component {
	 constructor() {
       super();
     }

	onAfterDeleteRow(rowKeys){
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deleteElemento(rowKeys[i]);

	}
   updateElemento(row, cellName, cellValue) {
		   this.props.updateElemento(row);
   }
   customConfirm(next, dropRowKeys) {
	 const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
   }


   render() {
 	    const editar = {
 			mode         : 'dbclick',
 			blurToSave   : true,
 			afterSaveCell: this.updateElemento.bind(this)
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
				height    = 'auto'
				search    = {true}
				data      = {this.props.datos_elemento}
				deleteRow = {true}
				selectRow = {BsTable.selectFila}
				cellEdit  = {editar}
				options   = {opciones}
				hover
				striped>
				<TableHeaderColumn isKey dataField='id_equipo' hidden>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='id_tipo_equipo' hidden>Tipo equipo</TableHeaderColumn>
				<TableHeaderColumn dataField='descripcion' dataSort>Descripción</TableHeaderColumn>
				<TableHeaderColumn dataField='cod_patrimonial' dataSort>Cód. patrimonial</TableHeaderColumn>
				<TableHeaderColumn editable={false} dataField='servicio_nombre' dataSort>Servicio</TableHeaderColumn>
				<TableHeaderColumn dataField='padre_desc' dataSort >Equipo contenedor</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TableEquipo;
