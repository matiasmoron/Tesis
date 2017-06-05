var React = require('react');

import * as api from '../api/tecnico_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import TableTecnicos from './TableTecnicos';
import Input from './genericos/Input';

class PanelTecnico extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		console.log("adasdasd");
		console.log(api.getElementos());
		api.getElementos();
	}


	_addElemento(event){
		event.preventDefault();
		api.addElemento(this._nombre.value);
		api.getElementos();
    }
	_deleteElemento(id){
		console.log("hola",id);
		api.deleteElemento(id);
    }
	_updateElemento(elem){
		api.updateElemento(elem);
	}

	render() {
	  return (
		<div className="col-md-9">
			<Formulario titulo="Creación Técnico" submit={this._addElemento.bind(this)}>
				<Input label="DNI" valor={input => this._nombre = input} />
				<button type="submit" className="btn btn-success">Agregar técnico</button>
			</Formulario>
        	<TableTecnicos datos_elemento={this.props.tecnicos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    tecnicos: store.tecnicoState.tecnicos
  };
};

export default connect(mapStateToProps)(PanelTecnico);
