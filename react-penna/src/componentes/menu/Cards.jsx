var React = require('react');
// require("../../styles/menu.scss");

const Cards = (props) => {
      return (
        <section className="col-md-12">
			<ul className="cards col-md-12">
				{props.children}
			</ul>
		</section>
      );
}

export default Cards
