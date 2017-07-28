var React = require('react');

export const Formulario = (props) => {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">{props.titulo}</div>
            <div className="panel-body">
                <form className="" onSubmit={props.submit}>
					{props.children}
                </form>
            </div>
        </div>
      );
}

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

export const SelectInput = (props) => {
      return (
			<div className={props.clases}>
				<label>{props.label}</label>
				<select onChange={props.onChange} className="form-control" ref={props.valor} >
                    {
                      props.data_opciones.map(function(opt) {
                        return <option key={opt[`${props.llave}`]}  value={opt[`${props.llave}`]}>{opt[`${props.descripcion}`]}</option>;
                      })
                    }
				</select>
			</div>
      );
}

export const Label = (props) => {
      return (
			<div className={props.clases}>
				<label htmlFor="servicio">{props.label}</label>
				<span className="form-control" disabled>{props.value}</span>
			</div>
      );
}
