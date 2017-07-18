var React = require('react');
import {Link} from 'react-router-dom';
// require("../../styles/menu.scss");
require("../../styles/card.scss");
import logo from '../../img/medico.png';


const Card = (props) => {
      return (
        <li className="col-md-3 col-xs-12" >
			<Link to={props.url}  >
				{/* <i className={props.icon} aria-hidden="true"></i> */}
				{/* <div className="ca-content">
					<h4 className="ca-main nueva">6</h4>
					<h3 className="ca-sub nueva">{props.nombre}</h3>
				</div> */}
                <div className="card">
                  <h1>{props.nombre}</h1>
                  <div className="tipo1"></div>
                  {/* <div><img src={logo}/></div> */}
                </div>
			</Link>
		</li>
      );
}

export default Card
