var React = require('react');
import PanelTecnico from "./PanelTecnico";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelTecnico/>
	</div>
  );
};

export default Container
