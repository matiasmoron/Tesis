var React = require('react');
require("../../styles/header.scss");
import logo from '../../img/fotor_penna.png'

const Header = (props) => {
      return (
        <header className="header-login-signup">
	        <div className="header-limiter">
	            <h1>
                    <img src={logo}/>
	                <span  className="white">Hospital Penna </span>
	            </h1>
	            <ul>
	                <li><a href="#">Login</a></li>
	                <li><a href="#">Sign up</a></li>
	            </ul>
	        </div>
	    </header>
      );
}

export default Header
