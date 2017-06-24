var React = require('react');
import PanelEntidad from "./PanelEntidad";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container col-md-10 col-offset-1">
		<PanelEntidad/>
	</div>
  );
};

export default Container
