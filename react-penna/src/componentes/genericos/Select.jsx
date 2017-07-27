var React = require('react');


const SelectInput = (props) => {
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

export default SelectInput;
