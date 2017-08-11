var React = require('react');
import Select from 'react-select';
require("../../styles/select.scss");

class SelectChosen extends React.Component {
	constructor() {
      super();
	  this.state = {value:''};
    }

	armarOptions(data,llave,descripcion){
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

	// console.log(this.pro);
	  return (
		 <div>
			<label>{this.props.label}</label>
			<Select
			  name="form-field-name"
			  placeholder="Seleccione una opción"
			  noResultsText="No existen opciones"
			  options={this.armarOptions(this.props.data,this.props.llave,this.props.descripcion)}
			  onChange={this.onChange.bind(this)}
			  value={this.state.value}
			  className='form-group'
			  multi={this.props.multi}
			/>
		</div>
	  );
	}
}

export default SelectChosen;
