var React = require('react');

import { connect } from 'react-redux';
import store from '../store';
import * as ApiAutenticacion from '../api/autenticacion_api';
import Login from './genericos/Login'
import Logout from './genericos/Logout'


const PagInicial = (props) => {

	console.log("props",props);
	return (
  	<div>
			<Login
				errorMessage={props.autenticacion.errorMessage}
				onLoginClick={ creds => ApiAutenticacion.loginUser(creds) }
			/>
  	</div>
    );

}




const mapStateToProps = function(store) {

  return {
	  autenticacion 	 : store.autenticacionState,
  };
};

 export default connect(mapStateToProps)(PagInicial);
