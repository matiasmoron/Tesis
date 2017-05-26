var React = require('react');
var ReactDOM = require('react-dom');
import Panel from "./table";

class Container extends React.Component {
		render() {
	      return (
			<div className="gral-container container">
				<Panel titulo="Creación Servicio" url="servicio" />
	        	<Panel titulo="Creación Puesto" url="puesto" />
			</div>
	      );
	    }
}


export default Container
