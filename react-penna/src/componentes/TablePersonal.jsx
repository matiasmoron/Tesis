var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class PriceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
     this.state = { row: props.row,
		 			valor_actual: props.row.id_servicio };
  }

  updateData() {
    console.log("row",this.state.row);
    console.log("valor viejo",this.state.row.id_servicio);
    console.log("valor nuevo",this.state.valor_actual);
    this.state.row.id_servicio= this.state.valor_actual;
    this.props.onUpdate(this.state.row,"id_servicio",this.state.valor_actual);
  }

// onChange={ (ev) => { console.log(ev.currentTarget.value) } }
  render() {
    return (
      <div>
        <div>
            <select
    			value={ this.state.valor_actual }
    			onChange={ (ev) => { this.setState({ valor_actual: ev.currentTarget.value });

    								 } } >
               >
              { this.props.datos.map(dato => (<option key={ dato.id_servicio } value={ dato.id_servicio }>{ dato.nombre }</option>)) }
             </select>
         </div>
        <div>
            <button
              className='btn btn-info btn-xs textarea-save-btn'
              onClick={ this.updateData.bind(this) }>
              guardar
            </button>
        </div>
    </div>
    );
  }
}


class TableSolicitud extends React.Component {
	 constructor() {
       super();
     }

	onAfterDeleteRow(rowKeys){
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deleteElemento(rowKeys[i]);

	}
   updateElemento(row, cellName, cellValue) {
		  console.log("update",row);
		   this.props.updateElemento(row);
   }
   customConfirm(next, dropRowKeys) {
	 const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
   }

   componentDidMount() {
    console.log("component did mount");
    // document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        console.log("outside");
        this.props.getPersonal();
    }

    componentWillUnmount() {
        console.log("unmount");
        // document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }


    servicioFormatter(cell, row,servicios) {
    //   console.log("servicios",this.props.servicios);
    //   console.log("cell",cell);
      var resultado=0;
      servicios.map((servicio) =>{
          if (servicio.id_servicio==cell)
              resultado=servicio.nombre;
      });
      return resultado;
	}

   render() {
	   	const btnEliminar = (onClick) => {
 		   return (
 			   <DeleteButton
 				   btnText       = 'Eliminar'
 				   btnContextual = 'btn-danger'
 				   className     = 'my-custom-class'
 				   btnGlyphicon  = 'glyphicon-trash'
 				   onClick       = { onClick }/>
 			   );
 		   }
 	    const editar = {
 			mode         : 'click',
 			blurToSave   : true,
 			afterSaveCell: this.updateElemento.bind(this)
 	   	};

 		const selectFila={
 			mode: 'checkbox'
 		};

 		const opciones= {
 			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
 			deleteBtn             : btnEliminar,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true
 		};

		const servicios=this.props.servicios;
		// const createPriceEditor = () => (<PriceEditor onUpdate={ this.onUpdate } datos={servicios}/>);
		const createPriceEditor = (onUpdate, props) => (<PriceEditor onUpdate={ this.updateElemento.bind(this) } {...props}/>);
		 return (
			<BootstrapTable
				height    = 'auto'
				search    = {true}
				data      = {this.props.datos_elemento}
				deleteRow = {true}
				selectRow = {selectFila}
				cellEdit  = {editar}
				options   = {opciones}
				hover>
				<TableHeaderColumn isKey dataField='legajo'>Legajo</TableHeaderColumn>
				<TableHeaderColumn dataField='usuario'>Usuario</TableHeaderColumn>
				<TableHeaderColumn dataField='dni'>DNI</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				<TableHeaderColumn dataField='apellido'>Apellido</TableHeaderColumn>
				<TableHeaderColumn dataField='nombre_puesto'>Puesto</TableHeaderColumn>
				{/* <TableHeaderColumn dataField='fecha_ingresio'>Fecha Ingreso</TableHeaderColumn> */}
				<TableHeaderColumn
					dataFormat={ this.servicioFormatter}
                    formatExtraData={servicios}
		            dataField='id_servicio'
		            customEditor={ { getElement: createPriceEditor,customEditorParameters: { datos:servicios } } }>
		            Product Price
	           </TableHeaderColumn>

			</BootstrapTable>
		 );
   }
}

export default TableSolicitud;
