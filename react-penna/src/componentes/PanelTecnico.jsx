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
		api.getTecnicos();
	}

	componentWillUpdate (nextProps){
		if(nextProps.personal[0]!=undefined){
			this._nombre.value= nextProps.personal[0].nombre;
			this._entidad.value= nextProps.personal[0].entidad;
		}
		else{
			this._nombre.value= "";
			this._entidad.value= "";
		}
	}

	_getPersonal(event){
		event.preventDefault();
		console.log("hago el get");

		api.getPersonal(this._dni.value);

	}
	_addElemento(event){
		event.preventDefault();
		api.addElemento(this._nombre.value);
		api.getTecnicos();
    }
	_deleteElemento(id){
		api.deleteElemento(id);
    }
	_updateElemento(elem){
		api.updateElemento(elem);
	}

	render() {
	  return (
		<div className="col-md-9">
			<Formulario titulo="Creación Técnico" submit={this._getPersonal.bind(this)}>
				<Input label="DNI" placeholder="Ingrese un dni" valor={input => this._dni = input} />
				<Input label="Nombre"  placeholder="Nombre" valor={input => this._nombre = input} />
				<Input label="Entidad" placeholder="Entidad"  valor={input => this._entidad = input} />
				<button type="submit" className="btn btn-success">Buscar</button>
			</Formulario>
        	<TableTecnicos datos_elemento={this.props.tecnicos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log("maps",store.tecnicoState);
  return {
    tecnicos: store.tecnicoState.tecnicos,
	personal: store.tecnicoState.personal
  };
};

export default connect(mapStateToProps)(PanelTecnico);
