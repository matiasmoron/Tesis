var React = require('react');
import {Link} from 'react-router-dom';
require("../../styles/menu.scss");

const Card = (props) => {
      return (
        <li className="col-md-3 col-xs-12" onClick={props.changeCard}>
			<Link to={props.url}  >
				<i className={props.icon} aria-hidden="true"></i>
				<div className="ca-content">
					<h4 className="ca-main nueva">6</h4>
					<h3 className="ca-sub nueva">{props.nombre}</h3>
				</div>
			</Link>
		</li>
      );
}

export default Card
