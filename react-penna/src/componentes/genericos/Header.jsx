var React = require('react');
require("../../styles/header.scss");

const Header = (props) => {
      return (
        <header className="header-login-signup">
	        <div className="header-limiter">
	            <h1>
                    <img src="../../img/fotor_penna.png"/>
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
