var React = require('react');

import * as servicioApi from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import TableServicio from './TableServicio';
import {Input2,Formulario} from '../genericos/FormElements';

class PanelServicio extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validation : {
			  nombre :{
				  isValid:false,
				  message:""
			  }
		  }
	  }
    }

	componentDidMount(){
		servicioApi.getServicios();
	}


	_addElemento(event){
		event.preventDefault();
		var promesa = servicioApi.addServicio(this._nombre.value);

		promesa.then( valor => {
			servicioApi.getServicios();
		});
    }

	_deleteServicio(id){
		servicioApi.deleteServicio(id);
    }
	_updateServicio(servicio){
		servicioApi.updateServicio(servicio);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación servicio" submit={this._addElemento.bind(this)}>
				<div className="row">
					<Input2 clases="form-group col-md-6"  requerido={true} validacion={this.state.validation.nombre}  label="Nombre" valor={input => this._nombre = input} cambiar={p1 => this.setState({validation:{nombre:p1}})}  />
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar servicio</button>
					</div>
				</div>
			</Formulario>
        	<TableServicio datos_elemento={this.props.servicios} updateServicio={this._updateServicio.bind(this)} deleteServicio={this._deleteServicio.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelServicio);
