var React   = require('react');
var Popover = require("react-bootstrap/lib/Popover");
import {showMsg} from '../../api/msg_alert_api';


export const Formulario = (props) => {
    const estilo ={
        display     : 'inline',
        background  : '#3c91bb',
        border      : '#3c91bb',
        borderRadius: '5px',
        marginRight : '10px',
        color       : 'white'
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
                <form className="" id={props.id} onSubmit={props.submit}>
					{props.children}
                </form>
            </div>
        </div>
      );
}

/**
 * Resetea el fomulario y vuelve a falso las validaciones del mismo
 * @param string id        id del formulario que se quiere resetear los valores del input
 * @param        validator validator del formulario
 * @return un nuevo validator con los isValid en undefined
 */
export const resetForm = (id,validator) => {
    document.getElementById(id).reset();
    for (var campo_validator in validator) {
        validator[`${campo_validator}`]=Object.assign({}, validator[`${campo_validator}`], {isValid : undefined , msg: undefined});
    }

    return validator;
}

export const Input = (props) => {
      return (
            <div className={"form-group " +props.clases}>
                <label >{props.label}</label>
                <input type="text" disabled={props.disabled} className="form-control" value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
            </div>
      );
}

const validator = (event,props) => {
    if(props.validator.required && event.target.value.length==0){
        props.cambiar(Object.assign({}, props.validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
        return;
    }

    if(props.validator.type != undefined){
        switch (props.validator.type) {
            case "numeric":
                if(isNaN(event.target.value)){
                    props.cambiar(Object.assign({}, props.validator, {isValid : false, msg : "El campo debe ser un entero"}));
                    return;
                }
            break;
        }
    }
    props.cambiar(Object.assign({}, props.validator, {isValid : true, msg : ""}));
}


export const Input2 = (props) => {
    let isValid = (props.validator.isValid == undefined) ? false : props.validator.isValid;
    const styleLabel =  (isValid) ?  'hidden' :  '';
    const styleInput =  (isValid || props.validator.msg == undefined) ?  '' :  'invalid';
      return (
			<div className={"form-group " +props.clases}>
				<label>{props.label}</label>
				<input type="text" disabled={props.disabled} onBlur={(e) => validator(e, props)} onChange={(e) => validator(e, props)} className={"form-control "+styleInput} value={props.value}  placeholder={props.placeholder} ref={props.valor}/>
                <span className={"msj_error " +styleLabel}> {props.validator.msg}</span>
			</div>
      );
}

/**
 * Verifica si se habilita el submit según las validaciones pasadas, si valida ejecuta la función de callback y sino muestra un mensaje
 * @param  {[type]}   validator [description]
 * @param  {Function} callback  funcion que se ejecuta si valida
 */
export const habilitarSubmit = (validator,callback) => {
     let habilita = Object.keys(validator).reduce(function(valorAnterior,valorAct){
                         return valorAnterior && validator[valorAct].isValid;
                    }
                    ,true);

    if (habilita){
        callback();
    }
    else{
	    showMsg("Debe completar todos los campos para poder continuar");
    }
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
