var React = require('react');

import * as api from '../api/tecnico_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import TableTecnicos from './TableTecnicos';
import Input from './genericos/Input';
import SelectInput from './genericos/Select';

class PanelTecnico extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		api.getTecnicos();
	}

	componentWillUpdate(nextProps, nextState){
		// console.log("next",nextProps,this.props);
		console.log("props",this.props.personal);
			console.log("next",nextState);
		if(nextProps.personal[0]!=undefined){
			this._nombre.value= nextProps.personal[0].nombre;
			//Actualizar select
			// console.log(nextProps.personal[0].legajo);
			// console.log(this.props.personal[0].legajo)
			if(this.props.personal[0] == undefined)
				api.getTecnicoEntidad(nextProps.personal[0].legajo);
			else
				if(nextProps.personal[0].legajo != this.props.personal[0].legajo){
					console.log("cambio");
					api.getTecnicoEntidad(nextProps.personal[0].legajo);
				}
		}
		else{
			this._nombre.value= "";
			//ocultar el select
			// api.getTecnicoEntidad(nextProps.personal[0].legajo);
		}
	}

	_getPersonal(event){
		event.preventDefault();
		console.log("hago el get");
		api.getPersonal(this._legajo.value);

	}
	_addElemento(event){
		event.preventDefault();
		console.log(this._legajo.value);
		console.log(this._entidad.value);
		api.addElemento(this._legajo.value,this._entidad.value);
    }
	_deleteElemento(tecnico){
		api.deleteElemento(tecnico);
    }
	_updateElemento(elem){
		api.updateElemento(elem);
	}

	render() {
	  return (
		<div className="col-md-9">
			<Formulario titulo="Creación Técnico" submit={this._getPersonal.bind(this)}>
				<div className="row">
					<Input label="Legajo" placeholder="Ingrese un legajo" valor={input => this._legajo = input} />
					<Input label="Nombre"  placeholder="Nombre" valor={input => this._nombre = input} />
					<button type="submit" className="btn btn-success">Buscar</button>
				</div>
				<div className="row">
					<SelectInput data_opciones={this.props.entidades} label="Entidad"   valor={input => this._entidad = input} />
					<button onClick={this._addElemento.bind(this)} className="btn btn-success">Agregar técnico</button>
				</div>
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
	personal: store.tecnicoState.personal,
	entidades: store.tecnicoState.entidades
  };
};

export default connect(mapStateToProps)(PanelTecnico);
