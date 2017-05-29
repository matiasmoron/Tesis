var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class TableServicio extends React.Component {
	 constructor() {
       super();
     }

	onAfterSaveCell(row, cellName, cellValue) {
		  	console.log(row);
	}

	onAfterDeleteRow(rowKeys){

	}



   render() {
	   const cellEditProp = {
	   	  mode: 'click',
	   	  blurToSave: true,
	   	  afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
	   	};

		const selectRowProp={
			mode: 'checkbox'
		};

		const options= {
			afterDeleteRow: this.onAfterDeleteRow,
		};

		 return (
			 <BootstrapTable height='auto' search={true} data={this.props.datos_elemento} deleteRow={true} selectRow={selectRowProp}  cellEdit={ cellEditProp } options={options} hover>
				 <TableHeaderColumn isKey dataField='id_servicio'>ID</TableHeaderColumn>
				 <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				 <TableHeaderColumn dataField='edit'>Editar </TableHeaderColumn>
				 <TableHeaderColumn dataField='borrar'>Borrar </TableHeaderColumn>
			 </BootstrapTable>
		 );
   }
}

export default TableServicio;
