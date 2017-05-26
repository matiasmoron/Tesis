var React = require('react');

import * as servicioApi from '../api/servicio_api';
import { connect } from 'react-redux';
import store from '../store';
import FormCreacion from './FormCreacion';
import Table from './Table';

class Panel extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		servicioApi.getServicios();
	}


	_addElemento(nombre){
        servicioApi.addServicios(nombre);
		servicioApi.getServicios();
    }

	render() {
	  return (
		<div className="col-md-5">
			<FormCreacion titulo={this.props.titulo} addElemento={this._addElemento.bind(this)} />
        	<Table datos_elemento={this.props.servicios}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {

  return {
    servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(Panel);
