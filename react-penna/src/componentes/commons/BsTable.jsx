var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

// export function onAfterDeleteRow(rowKeys){
// 	console.log("asdasdas");
// }

export const btnEliminar = (onClick) => {
   return (
	   <DeleteButton
			 btnText='Eliminar'
			 btnContextual='btn-danger'
			 className='my-custom-class'
			 btnGlyphicon='glyphicon-trash'
			 onClick={onClick}/>
		 );
}

export const searchField = (props) => {
  return (
    <SearchField
        className=''
        defaultValue=''
        placeholder='Buscar'/>
  );
}

export const btnClear = (onClick) => {
  return (
    <ClearSearchButton
      btnText='Limpiar'
      btnContextual='btn-default'
      className='my-custom-class'
      onClick={onClick}/>
  );
}

export const selectFila={
		mode: 'checkbox'
};
