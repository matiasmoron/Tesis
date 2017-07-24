var React = require('react');

const Label = (props) => {
      return (
			<div className={props.clases}>
				<label htmlFor="servicio">{props.label}</label>
				<span className="form-control" disabled>{props.value}</span>
			</div>
      );
}

export default Label
