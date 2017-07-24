var React = require('react');
import PanelEquipo from "./PanelEquipo";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelEquipo/>
	</div>
  );
};

export default Container
