var React = require('react');


class FormCreacion extends React.Component{
	_handleSubmit(event){
        event.preventDefault();
        let nombre = this._nombre;
        this.props.addElemento(nombre.value);
    }

	render() {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">{this.props.titulo}</div>
            <div className="panel-body">
                <form className="form-inline" onSubmit={this._handleSubmit.bind(this)}>
                   <div className="form-group">
                     <label htmlFor="servicio">Nombre</label>
                     <input type="text" className="form-control"  placeholder="Nombre servicio" ref={(input)=> this._nombre=input}/>
                   </div>
				   <button type="submit" className=" btn btn-success">Agregar servicio </button>
                </form>
            </div>
        </div>
      );
    }
}

export default FormCreacion
