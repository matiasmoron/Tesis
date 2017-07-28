var React = require('react');

export const Input = (props) => {
      return (
			<div className={props.clases}>
				<label htmlFor="servicio">{props.label}</label>
				<input type="text" disabled={props.disabled} className="form-control" value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
			</div>
      );
}

export const Boton = (props) => {
	return (
			<button onClick={props.onClick} className={"btn " +props.clases}>{props.label}</button>
	);
}
