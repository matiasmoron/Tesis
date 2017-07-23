var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class TableTecnicos extends React.Component {
	 constructor() {
       super();
     }

	 onAfterDeleteRow(rowKeys){
		 for (var i = 0; i < rowKeys.length; i++){
			var tecnico= rowKeys[i].split(",");
			this.props.deleteElemento({legajo:tecnico[0],id_entidad:tecnico[1]});
		 }
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
				options={opciones}
				hover>
				<TableHeaderColumn isKey dataField='tecnico_key' hidden>key</TableHeaderColumn>
				<TableHeaderColumn dataField='legajo'>Legajo</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				<TableHeaderColumn dataField='entidad'>Entidad</TableHeaderColumn>

			</BootstrapTable>
		 );
   }
}

export default TableTecnicos;
