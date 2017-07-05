var React = require('react');

import * as Api from '../api/equipo_api';
import { connect } from 'react-redux';
import store from '../store';
import Formulario from './genericos/Formulario';
import Input from './genericos/Input';
import TableEquipo from './TableEquipo';

class PanelEquipo extends React.Component {
	constructor() {
      super();
    }

	componentDidMount(){
		Api.getEquipos();
	}


	_addElemento(event){
		event.preventDefault();
		Api.addEquipo({id_tipo_equipo:this._id_tipo_equipo.value,descripcion:this._descripcion.value,
					cod_patrimonial:this._cod_patrimonial.value,id_servicio:this._id_servicio.value,
					id_equipo_padre:this._id_equipo_padre.value});
    }

	_deleteElemento(id){
		Api.deleteEquipo(id);
    }
	_updateElemento(equipo){
		Api.updateEquipo(equipo);
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación Equipo" submit={this._addElemento.bind(this)}>
				<Input label="Tipo Equipo" valor={input => this._id_tipo_equipo = input} />
				<Input label="Descripcion" valor={input => this._descripcion = input} />
				<Input label="Código Patrimonial" valor={input => this._cod_patrimonial = input} />
				<Input label="Servicio" valor={input => this._id_servicio = input} />
				<Input label="Equipo Contenedor" valor={input => this._id_equipo_padre = input} />
				<button type="submit" className="btn btn-success">Agregar Equipo</button>
			</Formulario>
        	<TableEquipo datos_elemento={this.props.equipos} updateElemento={this._updateElemento.bind(this)} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
console.log( store.equipoState);
  return {
    equipos: store.equipoState.equipos
  };
};

export default connect(mapStateToProps)(PanelEquipo);
