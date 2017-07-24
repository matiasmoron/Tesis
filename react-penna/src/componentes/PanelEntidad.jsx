var React = require('react');

import * as entidadApi from '../api/entidad_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import TableEntidad from './TableEntidad';
import SelectInput from './genericos/Select';
import {tipoEntidad} from './commons/Utils';

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

	armarSelect(){
		var resultado={};
		var resultado= Object.keys(tipoEntidad).map((valor) =>{
			var elem = [];
			elem = {
				tipo_entidad:valor,
				descripcion:tipoEntidad[valor]
			}
			return elem;
			}
        );
		return resultado;
	}

	render() {
	  var datos_select = this.armarSelect();
	  console.log("render",datos_select);
	  return (
		<div className="col-md-6">
			<Formulario titulo="Creación entidad" submit={this._addElemento.bind(this)}>
				<div className="row">
					<Input clases="form-group col-md-6" label="Nombre" valor={input => this._nombre = input} />
					<SelectInput clases="form-group col-md-6" data_opciones={datos_select} llave="tipo_entidad" descripcion="descripcion" label="Tipo"   valor={input => this._tipo_entidad = input} />
				</div>
				<div className="btn-form">
					<button type="submit" className="btn btn-success">Agregar Entidad</button>
				</div>
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
