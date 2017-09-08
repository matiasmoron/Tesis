var React = require('react');
var Popover = require("react-bootstrap/lib/Popover");


export const Formulario = (props) => {
    const estilo ={
        display: 'inline',
        background: '#3c91bb',
        border:'#3c91bb',
        borderRadius:'5px',
        marginRight:'10px',
        color:'white'
     }
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <span className="input-group-addon" style={estilo}>
                    <i className="fa fa-hospital-o fa-lg"></i>
                </span>
                {props.titulo}
            </div>
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
			<div className={"form-group " +props.clases}>
				<label >{props.label}</label>
				<input type="text" disabled={props.disabled} className="form-control" value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
			</div>
      );
}

export const Boton = (props) => {
    const iconStyle= (props.label) ? {marginRight:"5px"} :{};
    const icono = (props.icon) ? <i style={iconStyle} className={props.icon} aria-hidden="true"></i> :"";
	return (
			<button onClick={props.onClick} title={props.titulo} className={"btn " +props.clases}>
                {icono}
                {props.children}{props.label}</button>
	);
}

export const SelectInput = (props) => {
      var todos = props.todos ? <optgroup label="Todas las opciones"><option value=""> Todos </option> </optgroup>: "";
      var vacio = props.vacio ? <option value=""> Seleccione una opción </option> :"";
      return (
			<div className={"form-group " +props.clases}>
				<label>{props.label}</label>
				<select onChange={props.onChange} className="form-control" ref={props.valor} >
                    {todos}
                    <optgroup label="Opciones">
                        {vacio}
                        {
                          props.data_opciones.map(function(opt) {
                            return <option key={opt[`${props.llave}`]}  value={opt[`${props.llave}`]}>{opt[`${props.descripcion}`]}</option>;
                          })
                        }
                    </optgroup>
				</select>
			</div>
      );
}

export const Label = (props) => {
      return (
			<div className={"form-group " + props.clases} >
				<label>{props.label}</label>
				<span className="form-control" >{props.value}</span>
			</div>
      );
}

export const TextArea = (props) => {
	return (
		<div className={"form-group " +props.clases}>
			<label>{props.label}</label>
			<textarea rows={props.rows} cols={props.cols} className="form-control"  defaultValue={props.value} placeholder={props.placeholder} ref={props.valor}></textarea>
		</div>
	);
}
