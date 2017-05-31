var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
// import * as BsTable from './commons/BsTable';

class TableServicio extends React.Component {
	 constructor() {
       super();
     }

	updateFila(row, cellName, cellValue) {
		  	console.log(row);
	}
	customConfirm(next, dropRowKeys) {
	  const dropRowKeysStr = dropRowKeys.join(',');
	  if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	    // If the confirmation is true, call the function that
	    // continues the deletion of the record.
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
			afterSaveCell: this.updateFila  // a hook for after saving cell
	   	};

		const selectFila={
			mode: 'checkbox'
		};

		const opciones= {
			afterDeleteRow: this.onAfterDeleteRow,
			deleteBtn: btnEliminar,
			handleConfirmDeleteRow: this.customConfirm
		};

		 return (
			<BootstrapTable
				height='auto'
				search={true}
				data={this.props.datos_elemento}
				deleteRow={true}
				selectRow={selectFila}
				cellEdit={editar}
				options={opciones}
				hover>
				<TableHeaderColumn isKey dataField='id_servicio'>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TableServicio;
