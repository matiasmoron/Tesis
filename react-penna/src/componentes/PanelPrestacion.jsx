var React = require('react');

import * as Api from '../api/prestacion_api';
import * as ApiServicio from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import {SelectInput,Input,PopOver,Formulario} from './genericos/FormElements';
import TablePrestacion from './TablePrestacion';
import SelectChosen from './genericos/SelectChosen';



class PanelPrestacion extends React.Component {
	constructor() {
      super();
    }
	componentDidMount(){
		Api.getPrestaciones();
		ApiServicio.getServicios();
	}


	_addElemento(event){
		event.preventDefault();
		var promesa = Api.addPrestacion({
						descripcion    :this._descripcion.value,
						id_servicio    :this._id_servicio.value,
						observacion:this._observacion.value});

		promesa.then( valor => {
			Api.getPrestaciones({id_servicio:this._id_servicio.value});
		});
    }

	_deleteElemento(id){
		Api.deletePrestacion({id_bien:id});
    }
	_updateElemento(prestacion){
		Api.updatePrestacion({
							id_bien        :prestacion['id_bien'],
							descripcion    :prestacion['descripcion'],
							observacion    :prestacion['observacion']
					});
	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getPrestaciones({id_servicio:this._id_servicio.value});
	}


	render() {
	  return (
		<div className="col-md-8">
			<div className="col-md-6 col-md-offset-3">
				<Formulario titulo="Creación equipo" submit={this._addElemento.bind(this)}>
					<SelectChosen  llave="id_servicio" descripcion="nombre" label="Servicios" onChange={this.changeSelect.bind(this)} data={this.props.servicios} valor={input => this._id_servicio = input}/>
					<div className="row">
						<Input clases="col-md-8" label="Descripcion" valor={input => this._descripcion = input} />
					</div>
					<div className="row">
						<Input clases="col-md-8" label="Observacion" valor={input => this._observacion = input} />
					</div>
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar Prestación</button>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
				<TablePrestacion datos_elemento={this.props.prestaciones} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log("store equipo", store);
  return {
    prestaciones: store.prestacionState.prestaciones,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelPrestacion);
