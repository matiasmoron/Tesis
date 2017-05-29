var React = require('react');
// var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class TablePuesto extends React.Component {
	 constructor() {
       super();
     }

   render() {
		 return (
			 <BootstrapTable height='auto' data={this.props.datos_elemento}  hover>
				 <TableHeaderColumn isKey dataField='id_servicio'>ID</TableHeaderColumn>
				 <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				 <TableHeaderColumn dataField='edit'>Editar </TableHeaderColumn>
				 <TableHeaderColumn dataField='borrar'>Borrar </TableHeaderColumn>
			 </BootstrapTable>
		 );
   }
}

export default TablePuesto;
