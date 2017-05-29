var React = require('react');

import * as puestoApi from '../api/puesto_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
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
		puestoApi.getPuestos();
    }

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación puesto" submit={this._addElemento.bind(this)}>
				<Input label="Nombre" valor={input => this._nombre = input} />
				<button type="submit" className="btn btn-success">Agregar Puesto</button>
			</Formulario>
        	<TablePuesto datos_elemento={this.props.puestos}/>
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
