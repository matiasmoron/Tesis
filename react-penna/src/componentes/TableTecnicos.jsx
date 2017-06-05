var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class TableServicio extends React.Component {
	 constructor() {
       super();
     }

	 onAfterDeleteRow(rowKeys){
		 for (var i = 0; i < rowKeys.length; i++)
			 this.props.deleteElemento(rowKeys[i]);

	 }
	updateElemento(row, cellName, cellValue) {
		  	console.log(row);
			this.props.updateElemento(row);
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
			afterSaveCell: this.updateElemento.bind(this)
	   	};

		const selectFila={
			mode: 'checkbox'
		};

		const opciones= {
			afterDeleteRow: this.onAfterDeleteRow.bind(this),
			deleteBtn: btnEliminar,
			handleConfirmDeleteRow: this.customConfirm,
			clearSearch: true
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
				<TableHeaderColumn isKey dataField='legajo'>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
			</BootstrapTable>
		 );
   }
}

export default TableServicio;
