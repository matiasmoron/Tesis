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

	onChange(val) {
		val= (val==null)? "" : val;
		this.setState({ value:val });
		this.props.valor(val);
		if(this.props.onChange)
			this.props.onChange(val);
	}

	render() {

	  return (
		 <div className={this.props.clases}>
			<label>{this.props.label}</label>
			<Select
			  name="form-field-name"
			  placeholder="Seleccione una opción"
			  noResultsText="No existen opciones"
			  options={this.armarOptions(this.props.data,this.props.llave,this.props.descripcion)}
			  onChange={this.onChange.bind(this)}
			  value={this.state.value}
			  className='form-group '
			  multi={this.props.multi}
			  clearValueText='Borrar'
			  clearAllText='Borrar todo'
			  clearable={this.props.clearable}
			/>
		</div>
	  );
	}
}

export default SelectChosen;
