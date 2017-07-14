var React = require('react');
import PanelSolicitud from "./PanelSolicitud";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container col-md-10 col-offset-1">
		<PanelSolicitud/>
	</div>
  );
};

export default Container
