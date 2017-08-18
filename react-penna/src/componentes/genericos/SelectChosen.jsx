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
	  	this.state = {value:''};
	  }
    }

	armarOptions(data,llave,descripcion){
		// console.log("this this",this);
		var newArray=[];
		data.map(function(opt) {
			newArray.push(
				{
					value:opt[llave],
					label:opt[descripcion]
				});
		});
		return newArray;
	}

	onChange(val) {
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
			/>
		</div>
	  );
	}
}

export default SelectChosen;
