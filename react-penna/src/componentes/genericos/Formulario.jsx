var React = require('react');


const Formulario = (props) => {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">{props.titulo}</div>
            <div className="panel-body">
                <form className="form-inline" onSubmit={props.submit}>
					{props.children}
                </form>
            </div>
        </div>
      );
}

export default Formulario
