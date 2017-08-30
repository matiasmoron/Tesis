var React = require('react');
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor() {
      super();
    }

	  handleClick(event) {
	    const email = this.refs.email
	    const password = this.refs.password
	    const creds = { email: email.value.trim(), password: password.value.trim() }
	    this.props.onLoginClick(creds)
	  }

	render(){
		return (
			 <div>
		        <input type='text' ref='email' className="form-control"  placeholder='Username'/>
		        <input type='password' ref='password' className="form-control"  placeholder='Password'/>
		        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
		          Login
		        </button>

		        {this.props.autenticacion.errorMessage &&
		          <p>{this.props.autenticacion.errorMessage}</p>
		        }
		      </div>
		);
	}

}



const mapStateToProps = function(store) {
	console.log("store autenticacion",store);
  return {
	  autenticacion 	 : store.autenticacionState,
  };
};

export default connect(mapStateToProps)(Login);
