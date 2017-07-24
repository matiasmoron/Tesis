var React = require('react');

const Input = (props) => {
      return (
			<div className={props.clases}>
				<label htmlFor="servicio">{props.label}</label>
				<input type="text" className="form-control" value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
			</div>
      );
}

export default Input
