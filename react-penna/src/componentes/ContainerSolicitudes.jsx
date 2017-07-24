var React = require('react');
import PanelSolicitud from "./PanelSolicitud";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelSolicitud/>
	</div>
  );
};

export default Container
