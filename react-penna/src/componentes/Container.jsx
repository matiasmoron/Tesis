var React = require('react');

require("../styles/backoffice.scss");

const Container = (props) => {
  return (
	<div className="gral-container">
		{props.children}
	</div>
  );
};

export default Container
