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
			exportCSVBtn          : BsTable.btnXls,
			noDataText            : 'No se encontraron resultados'
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
				<TableHeaderColumn isKey dataField='legajo' editable={ { validator: BsTable.columnNumeric } } invalidEditColumnClassName={ BsTable.invalidClass }>Legajo</TableHeaderColumn>
				<TableHeaderColumn dataField='usuario' editable={ { validator: BsTable.columnRequired } } invalidEditColumnClassName={ BsTable.invalidClass }>Usuario</TableHeaderColumn>
				<TableHeaderColumn dataField='dni' editable={ { validator: BsTable.columnNumeric } } invalidEditColumnClassName={ BsTable.invalidClass }>DNI</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre' editable={ { validator: BsTable.columnRequired } } invalidEditColumnClassName={ BsTable.invalidClass }>Nombre</TableHeaderColumn>
				<TableHeaderColumn dataField='apellido' editable={ { validator: BsTable.columnRequired } } invalidEditColumnClassName={ BsTable.invalidClass }>Apellido</TableHeaderColumn>
                <TableHeaderColumn  editable={false}  dataField='servicio_nombre'>Servicio</TableHeaderColumn>
				<TableHeaderColumn dataField='fecha_ingreso' editable={ { validator: BsTable.columnDate } } invalidEditColumnClassName={ BsTable.invalidClass }>Fecha ingreso</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TablePersonal;
