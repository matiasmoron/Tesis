var React = require('react');

const Input = (props) => {
      return (
			<div className="form-group">
				<label htmlFor="servicio">{props.label}</label>
				<input type="text" className="form-control" value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
			</div>
      );
}

export default Input
