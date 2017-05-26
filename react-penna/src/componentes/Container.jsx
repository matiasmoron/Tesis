var React = require('react');
import Panel from "./Panel";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<Panel titulo="Creación Servicio" url="servicio" />
    	<Panel titulo="Creación Puesto" url="puesto" />
	</div>
  );
};

export default Container
