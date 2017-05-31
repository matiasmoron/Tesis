var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

export function onAfterDeleteRow(rowKeys){
	console.log("asdasdas");
}

const createCustomDeleteButton = (onClick) => {
   return (
	   <DeleteButton
			 btnText='Eliminar'
			 btnContextual='btn-danger'
			 className='my-custom-class'
			 btnGlyphicon='glyphicon-trash'
			 onClick={ () => this.handleDeleteButtonClick(onClick) }/>
		 );
}
export createCustomDeleteButton;

const handleDeleteButtonClick = (onClick) => {
	 // Custom your onClick event here,
	 // it's not necessary to implement this function if you have no any process before onClick
	 console.log('This is my custom function for DeleteButton click event');
	 onClick();
}
export handleDeleteButtonClick;
