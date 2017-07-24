var React = require('react');
import PanelPersonal from "./PanelPersonal";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelPersonal/>
	</div>
  );
};

export default Container
