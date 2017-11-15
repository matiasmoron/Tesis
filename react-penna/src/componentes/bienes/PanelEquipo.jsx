var React = require('react');

import * as Api from '../../api/equipo_api';
import * as ApiServicio from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import {Input2,PopOver,Formulario,habilitarSubmit,resetForm} from '../genericos/FormElements';
import TableEquipo from './TableEquipo';
import SelectChosen from '../genericos/SelectChosen';
import {showMsg} from '../../api/msg_alert_api';

class PanelEquipo extends React.Component {
	constructor() {
      super();
	  this.state = {validator :this.initValidator()};
    }

	initValidator(){
		return {
			id_servicio:{
				required : true
			},
			descripcion:{
				required : true
			},
			cod_patrimonial:{
				required : true,
				type     : "numeric"
			},
			id_equipo_padre:{
				required : false
			}
		}
	}

	componentDidMount(){
		Api.getEquipos();
		ApiServicio.getServicios();
	}

	callbackSubmit(){
		var promesa = Api.addEquipo({
						id_tipo_equipo :1,
						descripcion    :this._descripcion.value,
						cod_patrimonial:this._cod_patrimonial.value,
						id_servicio    :this._id_servicio.value,
						id_equipo_padre:this._id_equipo_padre.value
					});

		promesa.then( valor => {
			Api.getEquipos({id_servicio:this._id_servicio.value});
			resetForm("form_equipo");
			this.setState({validator:this.initValidator()});
			showMsg("Se creo el equipo correctamente","ok");
		});
	}


	_addElemento(event){
		event.preventDefault();
		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	_deleteElemento(id){
		Api.deleteEquipo({id_bien:id});
    }
	_updateElemento(equipo){
		console.log("UPDATE",equipo);
		var promesa = Api.updateEquipo({
							id_bien        :equipo['id_bien'],
							cod_patrimonial:equipo['cod_patrimonial'],
							descripcion    :equipo['descripcion']
					});

		promesa.then( valor => {
			showMsg("Se actualizó el equipo correctamente","ok");
		});
	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getEquipos({id_servicio:this._id_servicio.value});
	}


	render() {
	  return (
		<div className="col-md-8">
			<div className="col-md-6 center">
				<Formulario id="form_equipo" titulo="Creación equipo" submit={this._addElemento.bind(this)}>
					<SelectChosen
						label       = "Servicios"
						llave       = "id_servicio"
						descripcion = "nombre"
						onChange    = {this.changeSelect.bind(this)}
						data        = {this.props.servicios}
						valor       = {input => this._id_servicio = input}
						validator   = {this.state.validator.id_servicio}
						cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
					/>
					<div className="row">
						<Input2
							label     = "Descripcion"
							valor     = {input => this._descripcion = input}
							clases    = "col-md-8"
							validator = {this.state.validator.descripcion}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{descripcion:p1})})}
						/>
					</div>
					<div className="row">
						<Input2
							label     = "Código patrimonial"
							valor     = {input => this._cod_patrimonial = input}
							clases    = "col-md-8"
							validator = {this.state.validator.cod_patrimonial}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{cod_patrimonial:p1})})}
						/>
					</div>
					<SelectChosen
						label       = "Equipo Contenedor"
						llave       = "id_bien"
						valor       = {input => this._id_equipo_padre = input}
						descripcion = "cod_desc"
						data        = {this.props.equipos}
						validator   = {this.state.validator.id_equipo_padre}
						cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_equipo_padre:p1})})}
					/>
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar equipo</button>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
				<TableEquipo datos_elemento={this.props.equipos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    equipos: store.equipoState.equipos,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelEquipo);
