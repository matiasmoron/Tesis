var React = require('react');

import * as entidadApi from '../api/entidad_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import TableEntidad from './TableEntidad';

class PanelEntidad extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		entidadApi.getEntidades();
	}


	_addElemento(event){
		event.preventDefault();
		entidadApi.addEntidad({tipo_entidad:this._tipo_entidad.value,nombre:this._nombre.value});
    }

	_deleteEntidad(id){
		entidadApi.deleteEntidad(id);
    }
	_updateEntidad(entidad){
		entidadApi.updateEntidad(entidad);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación entidad" submit={this._addElemento.bind(this)}>
				<Input label="Nombre" valor={input => this._nombre = input} />
				<Input label="Tipo" valor={input => this._tipo_entidad = input} />
				<button type="submit" className="btn btn-success">Agregar Entidad</button>
			</Formulario>
        	<TableEntidad datos_elemento={this.props.entidades} updateEntidad={this._updateEntidad.bind(this)} deleteEntidad={this._deleteEntidad.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log( store.entidadState);
  return {
    entidades: store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelEntidad);
