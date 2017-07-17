var React = require('react');
require("../../styles/menu.scss");

const Cards = (props) => {
      return (
        <section className="panel panel-success">
			<ul className="ca-menu col-md-12">
				{props.children}
			</ul>
		</section>
      );
}

export default Cards
