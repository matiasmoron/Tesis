var React = require('react');

const Input = (props) => {
      return (
			<div className="form-group">
				<label htmlFor="servicio">{props.label}</label>
				<input type="text" className="form-control"  placeholder="Nombre servicio" ref={props.valor}/>
			</div>
      );
}

export default Input
