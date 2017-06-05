var React = require('react');
import PanelTecnicos from "./PanelTecnico";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelTecnicos/>
	</div>
  );
};

export default Container
