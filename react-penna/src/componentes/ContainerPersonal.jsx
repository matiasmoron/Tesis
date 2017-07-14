var React = require('react');
import PanelPersonal from "./PanelPersonal";

require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container col-md-10 col-offset-1">
		<PanelPersonal/>
	</div>
  );
};

export default Container
