var React = require('react');
import PanelEquipo from "./PanelEquipo";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container col-md-10 col-offset-1">
		<PanelEquipo/>
	</div>
  );
};

export default Container
