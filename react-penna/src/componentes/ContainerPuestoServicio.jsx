var React = require('react');
import PanelServicio from "./PanelServicio";
import PanelPuesto from "./PanelPuesto";


require("../styles/backoffice.scss");

const Container = () => {
  return (
	<div className="gral-container">
		<PanelServicio/>
    	<PanelPuesto />
	</div>
  );
};

export default Container
