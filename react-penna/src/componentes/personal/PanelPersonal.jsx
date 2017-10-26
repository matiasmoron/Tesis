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
				type     : "numeric"
		  	},
		  	usuario :{
				required : true
		  	},
		  	dni :{
				required : true,
				type     : "numeric"
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
		var promesa = ApiPersonal.addPersonal({
												legajo       : this._legajo.value,
												usuario      : this._usuario.value,
												id_servicio  : this._id_servicio.value,
												dni          : this._dni.value,
												nombre       : this._nombre.value,
												apellido     : this._apellido.value,
												fecha_ingreso: this._fecha_ingreso.value
											});

		promesa.then( valor => {
			ApiPersonal.getPersonal();
			resetForm("form_personal");
			this.setState({validator:this.initValidator()});
			showMsg("Se creo el personal correctamente","ok");
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
					<div className="row">
						<Input2
							label     = "Legajo"
							valor     = {input => this._legajo = input}
							clases    = "col-md-4"
							validator = {this.state.validator.legajo}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{legajo:p1})})}
						/>
						<Input2
							label     = "Usuario"
							valor     = {input => this._usuario = input}
							clases    = "col-md-4"
							validator = {this.state.validator.usuario}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{usuario:p1})})}
						/>
						<Input2
							label     = "DNI"
							valor     = {input => this._dni = input}
							clases    = "col-md-4"
							validator = {this.state.validator.dni}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{dni:p1})})}
						/>
					</div>
					<div className="row">
						<Input2
							label     = "Nombre"
							valor     = {input => this._nombre = input}
							clases    = "col-md-4"
							validator = {this.state.validator.nombre}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{nombre:p1})})}
						/>
						<Input2
							label     = "Apellido"
							valor     = {input => this._apellido = input}
							clases    = "col-md-4"
							validator = {this.state.validator.apellido}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{apellido:p1})})}
						/>
						<DatePicker
							label     = "Fecha Ingreso"
							valor     = {input => this._fecha_ingreso = input}
							clases    = "col-md-4"
							validator = {this.state.validator.fecha_ingreso}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{fecha_ingreso:p1})})}
						/>
					</div>
					<div className="row">
						<SelectChosen
							label       = "Servicio"
							llave       = "id_servicio"
							valor       = {input => this._id_servicio = input}
							descripcion = "nombre"
							clases      = "col-md-6"
							data        = {this.props.servicios}
							validator   = {this.state.validator.id_servicio}
							cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
						/>
						<div className="btn-form">
							<button type="submit" className="btn btn-success">Agregar personal</button>
						</div>
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
		personal : store.personalState.personal,
		servicios: store.servicioState.servicios
	};
};

export default connect(mapStateToProps)(PanelPersonal);
