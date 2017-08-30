var React = require('react');

import * as puestoApi from '../../api/puesto_api';
import { connect } from 'react-redux';
import store from '../../store';
import {Input,Formulario} from '../genericos/FormElements';
import TablePuesto from './TablePuesto';

class PanelPuesto extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		puestoApi.getPuestos();
	}


	_addElemento(event){
		event.preventDefault();
		puestoApi.addPuesto(this._nombre.value);
    }

	_deletePuesto(id){
		puestoApi.deletePuesto(id);
    }
	_updatePuesto(puesto){
		puestoApi.updatePuesto(puesto);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación puesto" submit={this._addElemento.bind(this)}>
				<div className="row">
					<Input clases="form-group col-md-6" label="Nombre" valor={input => this._nombre = input} />
					<div className="btn-form">
						<button type="submit" className="btn btn-success">Agregar Puesto</button>
					</div>
				</div>
			</Formulario>
        	<TablePuesto datos_elemento={this.props.puestos} updatePuesto={this._updatePuesto.bind(this)} deletePuesto={this._deletePuesto.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {

  return {
    puestos: store.puestoState.puestos
  };
};

export default connect(mapStateToProps)(PanelPuesto);
