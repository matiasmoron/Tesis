var React = require('react');

import * as entidadApi from '../../api/entidad_api';
import { connect } from 'react-redux';
import store from '../../store';
import TableEntidad from './TableEntidad';
import {Input2,Formulario,habilitarSubmit,resetForm} from '../genericos/FormElements';
import {showMsg} from '../../api/msg_alert_api';
import SelectChosen from '../genericos/SelectChosen';
import {tipoEntidad} from '../commons/Utils';

class PanelEntidad extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validator : {
			  nombre :{
				  required : true
			  }
		  }
	  }
    }

	componentDidMount(){
		entidadApi.getEntidades();
	}

	_addElemento(event){
		event.preventDefault();

		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	callbackSubmit(){
		var promesa= entidadApi.addEntidad({tipo_entidad:this._tipo_entidad.value,nombre:this._nombre.value});

		promesa.then( valor => {
			entidadApi.getEntidades();
			let new_validator= resetForm("form_entidad",this.state.validator);
			this.setState({validator:new_validator});
			showMsg("Se creo correctamente la entidad","ok");
		});
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
		return (
			<div className="col-md-10">
				<div className="col-md-6 col-md-offset-3">
					<Formulario titulo="Creación entidad" id="form_entidad" submit={this._addElemento.bind(this)}>
						<div className="row">
							<Input2 clases="form-group col-md-6" label="Nombre"  validator={this.state.validator.nombre} valor={input => this._nombre = input} cambiar={p1 => this.setState({validator:{nombre:p1}})}/>
							<SelectChosen clearable={false} clases="form-group col-md-6" data={datos_select} llave="tipo_entidad" descripcion="descripcion" label="Tipo"   valor={input => this._tipo_entidad = input}/>
						</div>
						<div className="btn-form">
							<button type="submit" className="btn btn-success">Agregar Entidad</button>
						</div>
					</Formulario>
				</div>
				<div className="col-md-8 col-md-offset-2">
	        		<TableEntidad datos_elemento={this.props.entidades} updateEntidad={this._updateEntidad.bind(this)} deleteEntidad={this._deleteEntidad.bind(this)}/>
				</div>
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
