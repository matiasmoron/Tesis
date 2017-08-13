var React = require('react');

import * as servicioApi from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import Formulario from '../genericos/Formulario';
import TableServicio from './TableServicio';
import {Input} from '../genericos/FormElements';

class PanelServicio extends React.Component {
	constructor() {
      super();
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
					<Input clases="form-group col-md-6" label="Nombre" valor={input => this._nombre = input} />
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
