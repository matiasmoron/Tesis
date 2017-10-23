var React = require('react');

import * as ApiPersonal from '../../api/personal_api';
import * as ApiServicio from '../../api/servicio_api';
import * as ApiPuesto from '../../api/puesto_api';
import { connect } from 'react-redux';
import store from '../../store';
import DatePicker from '../genericos/DatePicker';
import SelectChosen from '../genericos/SelectChosen';
import {SelectInput,Input2,Formulario,habilitarSubmit,resetForm} from '../genericos/FormElements';
import {showMsg} from '../../api/msg_alert_api';
import TablePersonal from './TablePersonal';

class PanelPersonal extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validator :this.initValidator()
	  }
    }

	initValidator(){
		return {
	  			  legajo :{
	  				  required : true,
	  				  type : "numeric"
	  			  },
	  			  usuario :{
	  				  required : true
	  			  },
	  			  dni :{
	  				  required : true,
	  				  type : "numeric"
	  			  },
	  			  nombre :{
	  				  required : true
	  			  },
	  			  apellido :{
	  				  required : true
	  			  },
	  			  fecha_ingreso :{
	  				  required : true
	  			  },
				  id_servicio : {
					  required : true
				  }
	  		  };
	}

	componentDidMount(){
		ApiPersonal.getPersonal();
		ApiServicio.getServicios();
	}

	callbackSubmit(){
		var promesa=ApiPersonal.addPersonal({legajo:this._legajo.value,usuario:this._usuario.value,
						id_servicio:this._id_servicio.value,dni:this._dni.value, nombre: this._nombre.value,
						apellido: this._apellido.value, fecha_ingreso: this._fecha_ingreso.value});

		promesa.then( valor => {
			ApiPersonal.getPersonal();
			resetForm("form_personal");
			this.setState({validator:this.initValidator()});
			showMsg("Se creo  el personal correctamente","ok");
		});
	}

	_addElemento(event){
		event.preventDefault();

		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }


	_deleteElemento(legajo){
		ApiPersonal.deletePersonal(legajo);
    }
	_updateElemento(personal){
		var promesa =ApiPersonal.updatePersonal(personal);
		promesa.then( valor => {
			showMsg("Se actualizo el personal correctamente","ok");
		})
	}

	render() {
	  return (
		<div className="col-md-10">
			<div className="col-md-6 col-md-offset-3">
				<Formulario titulo="Creación Personal" id="form_personal" submit={this._addElemento.bind(this)}>
					<Input2 validator={this.state.validator.legajo} clases="form-group col-md-4" label="Legajo" valor={input => this._legajo = input} cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{legajo:p1})})}  />
					<Input2 validator={this.state.validator.usuario} clases="form-group col-md-4" label="Usuario" valor={input => this._usuario = input} cambiar={p1 => this.setState({validator :Object.assign({}, this.state.validator,{usuario:p1})})} />
					<Input2 validator={this.state.validator.dni} clases="form-group col-md-4" label="DNI" valor={input => this._dni = input} cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{dni:p1})})}  />
					<Input2 validator={this.state.validator.nombre} clases="form-group col-md-4" label="Nombre" valor={input => this._nombre = input} cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{nombre:p1})})}  />
					<Input2 validator={this.state.validator.apellido} clases="form-group col-md-4" label="Apellido" valor={input => this._apellido = input}  cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{apellido:p1})})}  />
					<DatePicker validator={this.state.validator.fecha_ingreso} clases="form-group col-md-4" label="Fecha Ingreso"  valor={input => this._fecha_ingreso = input} cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{fecha_ingreso:p1})})}/>
					<SelectChosen validator={this.state.validator.id_servicio} clases="form-group col-md-6" data={this.props.servicios} llave="id_servicio" descripcion="nombre" label="Servicio"   valor={input => this._id_servicio = input} cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})} />
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar Personal</button>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
        		<TablePersonal datos_elemento={this.props.personal}  getPersonal={ApiPersonal.getPersonal} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    personal: store.personalState.personal,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelPersonal);
