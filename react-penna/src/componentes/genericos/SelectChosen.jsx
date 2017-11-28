var React = require('react');
import Select from 'react-select';
require("../../styles/select.scss");

class SelectChosen extends React.Component {
	constructor(props) {
      super();

	  	if (props.defaultVal){
			this.state = {value:props.defaultVal};
			props.valor({value:props.defaultVal});
		}
		else {
			if(props.data.length>0){
				//Si es la primera opción y quiero dejar seteado el primero por defecto sin poder dejar el select vacío
				if(props.clearable != undefined  && !props.clearable && props.defaultVal == undefined){
					this.state = {value:props.data[0][props.llave]};
					props.valor({value:props.data[0][props.llave]});

				}
				else{
		  			this.state = {value:''};
					props.valor({value:''});
				}
			}
			else{
	  			this.state = {value:''};
				props.valor({value:''});
			}
		}
    }

	//Al actualizar las opciones verifica si el estado esta en dicha opciones
	componentWillReceiveProps(props){
		let state= this.state;
		let esta=true;
		if ( this.state.value!="" && this.state.value.value!=undefined){
			esta=false;
			props.data.forEach(function(opt) {
				if (opt[props.llave]==state.value.value){
					esta=true;
				}
			});
		}

		if (!esta){
			this.setState({ value:"" });
			props.valor({value:''});
		}

	}

	armarOptions(data,llave,descripcion){
		var newArray=[];
		data.map(function(opt,index) {
			newArray.push(
				{
					value:opt[llave],
					label:opt[descripcion]
				});
		});
		return newArray;
	}

	validate(validator,value){
        if(validator.required &&  (value==null || value.length==0)){
            this.props.cambiar(Object.assign({},validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
            return;
        }
        this.props.cambiar(Object.assign({}, validator, {isValid : true, msg : ""}));
    }

	onChange(val) {
		val= (val==null)? "" : val;
		this.validate(this.props.validator,val);
		this.setState({ value:val });
		this.props.valor(val);
		if(this.props.onChange)
			this.props.onChange(val);
	}

	//Utilizado para validar en caso que ingrese manualmente la busqueda
	onBlur(event){
		if (event.target.value!="" && event.target.value.length>0){
			this.props.cambiar(Object.assign({},this.props.validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
		}
	}

	render() {
	 const isValid    = (this.props.validator.isValid == undefined) ? false : this.props.validator.isValid;
	 const styleLabel = (isValid) ? 'hidden': '';
	 const styleInput = (isValid || this.props.validator.msg == undefined) ? '': 'invalid';
	 const clases = (this.props.clases== undefined) ? "" : this.props.clases;
	  return (
		 <div className={'form-group ' + clases}>
			<label>{this.props.label}</label>
			<Select
			  name           = "form-field-name"
			  placeholder    = "Seleccione una opción"
			  noResultsText  = "No existen opciones"
			  options        = {this.armarOptions(this.props.data,this.props.llave,this.props.descripcion)}
			  onChange       = {this.onChange.bind(this)}
			  value          = {this.state.value}
			  className      = ''
			  multi          = {this.props.multi}
			  clearValueText = 'Borrar'
			  clearAllText   = 'Borrar todo'
			  clearable      = {this.props.clearable}
			  onBlur         = {this.onBlur.bind(this)}
			/>
			<span className={"msj_error " +styleLabel}> {this.props.validator.msg}</span>
		</div>
	  );
	}
}

export default SelectChosen;
