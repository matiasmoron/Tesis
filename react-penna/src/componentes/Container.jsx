var React = require('react');
import PanelEntidad from "./PanelEntidad";

require("../styles/backoffice.scss");

const Container = (props) => {
  return (
	<div className="col-md-10 col-md-offset-1 gral-container">
		{props.children}
	</div>
  );
};

export default Container
