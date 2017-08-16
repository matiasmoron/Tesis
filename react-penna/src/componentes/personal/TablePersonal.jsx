var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from '../commons/BsTable';

class TablePersonal extends React.Component {
	 constructor() {
       super();
     }

	onAfterDeleteRow(rowKeys){
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deleteElemento(rowKeys[i]);

	}
   updateElemento(row, cellName, cellValue) {
		  console.log("update",row);
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
			exportCSVBtn          : BsTable.btnXls
		}

		// const servicios=this.props.servicios;
		// const createPriceEditor = (onUpdate, props) => (<PriceEditor onUpdate={ this.updateElemento.bind(this) } {...props}/>);
		 return (
			<BootstrapTable
				height    = 'auto'
				search    = {true}
				multiColumnSearch
				data      = {this.props.datos_elemento}
				deleteRow = {true}
				selectRow = {BsTable.selectFila}
				cellEdit  = {editar}
				options   = {opciones}
				exportCSV
				hover
				striped
				pagination>
				<TableHeaderColumn isKey dataField='legajo'>Legajo</TableHeaderColumn>
				<TableHeaderColumn dataField='usuario'>Usuario</TableHeaderColumn>
				<TableHeaderColumn dataField='dni'>DNI</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				<TableHeaderColumn dataField='apellido'>Apellido</TableHeaderColumn>
				<TableHeaderColumn  editable={false} dataField='puesto_nombre'>Puesto</TableHeaderColumn>
                <TableHeaderColumn  editable={false}  dataField='servicio_nombre'>Servicio</TableHeaderColumn>
				<TableHeaderColumn dataField='fecha_ingreso'>Fecha ingreso</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TablePersonal;
