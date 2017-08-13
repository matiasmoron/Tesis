var React = require('react');

import * as api from '../../api/tecnico_api';
import { connect } from 'react-redux';
import store from '../../store';
import Formulario from '../genericos/Formulario';
import TableTecnicos from './TableTecnicos';
import {SelectInput,Input,Label} from '../genericos/FormElements';

class PanelTecnico extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		api.getTecnicos();
		api.getTecnicoEntidad();
	}

	_getPersonal(event){
		event.preventDefault();
		api.getPersonal(this._legajo.value);
		api.getTecnicoEntidad(this._legajo.value);


	}
	_addElemento(event){
		event.preventDefault();
		var promesa=api.addElemento(this._legajo.value,this._entidad.value);

		promesa.then( valor => {
			api.getTecnicos(this._legajo.value);
			api.getTecnicoEntidad(this._legajo.value); //Obtiene las entidades que les falta a un técnico
		});
    }
	_deleteElemento(tecnico){
		api.deleteElemento(tecnico);
    }


	render() {
	  return (
		<div className="col-md-6">
			<Formulario titulo="Creación Técnico" submit={this._getPersonal.bind(this)}>
				<div className="row">
					<Input clases="form-group col-md-4" label="Legajo" placeholder="Ingrese un legajo" valor={input => this._legajo = input} />
					<Label  clases="form-group col-md-4" value={this.props.tecnico_personal.nombre} label="Nombre" />
					{/* <Input clases="form-group col-md-4" label="Nombre" value={this.props.tecnico_personal.nombre}  placeholder="Nombre" valor={input => this._nombre = input} /> */}
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Buscar</button>
					</div>
				</div>
				<SelectInput data_opciones={this.props.tecnicos_entidades} label="Entidad" llave="id_entidad" descripcion="nombre"  valor={input => this._entidad = input} />
				<div className="btn-form">
					<button onClick={this._addElemento.bind(this)} className="btn btn-success">Agregar técnico</button>
				</div>
			</Formulario>
        	<TableTecnicos datos_elemento={this.props.tecnicos} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log("store",store);
  return {
    tecnicos: store.tecnicoState.tecnicos,
	tecnico_personal: store.tecnicoState.tecnico_personal,
	tecnicos_entidades: store.tecnicoState.tecnicos_entidades
  };
};

export default connect(mapStateToProps)(PanelTecnico);
