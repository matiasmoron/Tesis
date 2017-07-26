var React = require('react');
import PanelOrdenes from "./PanelOrdenes";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelOrdenes/>
	</div>
  );
};

export default Container
