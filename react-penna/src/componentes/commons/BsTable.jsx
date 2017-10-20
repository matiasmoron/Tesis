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

export const btnXls  = (onClick) => {
  return (
    <ExportCSVButton
      btnText='Descargar XLS'
      onClick={onClick}/>
  );
}

export const selectFila={
	mode: 'checkbox'
};


////////////////
//VALIDACIONES //
////////////////
export const invalidClass = (cell, row) =>{
    return 'invalid';
}

export const columnRequired = (valor) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };

    if(valor.length==0){
        response.isValid            = false;
        response.notification.type  = 'error';
        response.notification.title = 'El campo no puede ser vacío';
        response.notification.msg   = 'Esc para cancelar';
    }
    return response;
}
export const columnNumeric = (valor) => {
    const response = columnRequired(valor);

    if(response.isValid && isNaN(valor)){
        response.isValid            = false;
        response.notification.type  = 'error';
        response.notification.title = 'El campo debe ser un valor numérico';
        response.notification.msg   = 'Esc para cancelar';
    }
    return response;
}

export const columnDate = (valor) => {
    console.log("ENTRE");
    const response = columnRequired(valor);
    if(response.isValid){
        var t = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if(t === null)
            response.isValid = false;
        else{
            var d = +t[1], m = +t[2], y = +t[3];

            if(m < 1 || m > 12 || d < 1 || d > 31) {
                response.isValid = false;
            }

        }

        if(!response.isValid){
            response.notification.type  = 'error';
            response.notification.title = 'Formato: dd/mm/yyyy';
            response.notification.msg   = 'Esc para cancelar';
        }

    }
    return response;
}
