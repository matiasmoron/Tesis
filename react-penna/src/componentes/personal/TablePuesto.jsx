var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class TablePuesto extends React.Component {
	 constructor() {
       super();
     }

	onAfterDeleteRow(rowKeys){
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deletePuesto(rowKeys[i]);

	}
   updatePuesto(row, cellName, cellValue) {
		   this.props.updatePuesto(row);
   }
   customConfirm(next, dropRowKeys) {
	 const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
   }


   render() {
	   	const btnEliminar = (onClick) => {
 		   return (
 			   <DeleteButton
 				   btnText='Eliminar'
 				   btnContextual='btn-danger'
 				   className='my-custom-class'
 				   btnGlyphicon='glyphicon-trash'
 				   onClick={ onClick }/>
 			   );
 		   }
 	    const editar = {
 			mode: 'dbclick',
 			blurToSave: true,
 			afterSaveCell: this.updatePuesto.bind(this)
 	   	};

 		const selectFila={
 			mode: 'checkbox'
 		};

 		const opciones= {
   			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
   			deleteBtn             : BsTable.btnEliminar,
   			searchField           : BsTable.searchField,
   			handleConfirmDeleteRow: this.customConfirm,
   			clearSearch           : true,
   			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
   		}
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
				<TableHeaderColumn isKey dataField='id_puesto'>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TablePuesto;
