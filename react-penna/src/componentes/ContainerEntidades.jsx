var React = require('react');
import PanelEntidad from "./PanelEntidad";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelEntidad/>
	</div>
  );
};

export default Container
