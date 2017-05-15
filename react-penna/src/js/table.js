var React = require('react');
var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class Table extends React.Component {
	 constructor() {
       super();
     }
   render() {
     return (
       <BootstrapTable data={this.props.data_info} striped hover>
          <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
	      <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
	      <TableHeaderColumn dataField='edit'> </TableHeaderColumn>
		  <TableHeaderColumn dataField='algo'> </TableHeaderColumn>
       </BootstrapTable>
     );
   }
}

class Form_Table extends React.Component {
	constructor() {
      super();
      this.state={
          servicios: [
              {id:1, nombre:"Morgan", edit:"Great",algo:""},
              {id:1, nombre:"Morgan", edit:"Great",algo:""}
          ]
      };
    }
	render() {
      return (
        <Table data_info={this.state.servicios}/>
      );
    }
}

export default Form_Table;
