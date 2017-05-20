/*
-Container
    -Panel
        -Form_Creacion
        -Table
    -Panel
        -Form_Creacion
        -Table
 */
import axios from 'axios';
// import styles from '../css/pruebas.css';

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
			 <BootstrapTable height='auto' data={this.props.datos_elemento}  hover>
				 <TableHeaderColumn isKey dataField='id_servicio'>ID</TableHeaderColumn>
				 <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
				 {/* <TableHeaderColumn dataField='edit'> </TableHeaderColumn>
				 <TableHeaderColumn dataField='algo'> </TableHeaderColumn> */}
			 </BootstrapTable>
		 );
   }
}



class Form_Creacion extends React.Component{
	_handleSubmit(event){
        event.preventDefault();
        let nombre = this._nombre;
        this.props.addElemento(nombre.value);
    }

	render() {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">{this.props.titulo}</div>
            <div className="panel-body">
                <form className="form-inline" onSubmit={this._handleSubmit.bind(this)}>
                   <div className="form-group">
                     <label htmlFor="servicio">Nombre</label>
                     <input type="text" className="form-control"  placeholder="Nombre servicio" ref={(input)=> this._nombre=input}/>
                     <button type="submit" className=" btn btn-success">Agregar servicio </button>
                   </div>
                </form>
            </div>
        </div>
      );
    }
}

class Panel extends React.Component {
	constructor() {
      super();
	//   this.state={
	// 	servicios: [
	// 		{id:1, nombre:"Morgan", edit:"Great",algo:""},
	// 		{id:1, nombre:"Morgan", edit:"Great",algo:""}
	// 	]
	//   };
		this.state={
			servicios: [
			]
		};
    }

	componentDidMount(){
		axios.get('http://localhost:8000/api/servicios').then(data => {
		  console.log(data);
		  this.setState( { servicios: data.data } );
	    });
	}


	_addElemento(nombre){
        axios.post('http://localhost:8000/api/servicios',"nombre="+nombre+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(data => {
			this.componentDidMount();
			// const elemento={
			//     nombre
			// }
			// this.setState({servicios : this.state.servicios.concat([elemento])});
         });
    }

	render() {
      return (
		<div className="col-md-6">
			<Form_Creacion titulo={this.props.titulo} addElemento={this._addElemento.bind(this)} />
        	<Table datos_elemento={this.state.servicios}/>
		</div>
      );
    }
}

class Container extends React.Component {
		render() {
	      return (
			<div className="gral-container container">
				<Panel titulo="Creación Servicio" url="servicio" />
	        	<Panel titulo="Creación Puesto" url="puesto" />
			</div>
	      );
	    }
}

export default Container;
