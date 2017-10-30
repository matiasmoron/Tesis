var React = require('react');
import { connect } from 'react-redux';
import * as ApiAutenticacion from '../api/autenticacion_api';

require("../styles/inicio.scss");
require("../styles/font-awesome-4.7.0/scss/font-awesome.scss");
import logo from '../img/fotor_penna2.png';
import Background from '../img/1.jpg';


class Inicio extends React.Component {
	constructor() {
      super();
    }
	handleClick(event) {
		event.preventDefault();
		const usuario = this.refs.usuario
		const password = this.refs.password
		const creds = { usuario: usuario.value.trim(), password: password.value.trim() }
		ApiAutenticacion.loginUser(creds);
	}

	render(){
		const sectionStyle = {
		  width: "100%",
		  backgroundImage: `url(${Background})`
		}
		return (
				<div className="inicio-penna" style={sectionStyle}>
		            <div className="inner-bg">
		                <div className="container">
		                    <div className="row">
		                        <div className="col-sm-2 text text-center">
		                            <img src={logo}/>
		                            <h1><strong>SisPenna</strong></h1>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-sm-6 text">
		                            <div className="description">
		                                <p>
		                                    Bienvenido al sistema de intranet del Hospital Interzonal Dr. José Penna
		                                </p>
		                            </div>
		                        </div>
		                        <div className="col-sm-4 col-sm-offset-2 form-box">
		                        	<div className="form-top">
		                        		<div className="form-top-left">
		                        			<h3>Ingresar a SisPenna</h3>
		                            		<p style={{whiteSpace: 'nowrap',marginTop: '20px'}}>Ingrese nombre de usuario y contraseña</p>
		                        		</div>
		                        		<div className="form-top-right">
		                        			<i className="fa fa-lock"></i>
		                        		</div>
		                            </div>
									<div className="form-error" hidden>
										<strong>Nombre de usuario y/o contraseña incorrecta</strong>
									</div>
		                            <div className="form-bottom">
					                    <form role="form" action="" method="post" className="login-form">
					                    	<div className="form-group">
					                    		<label className="sr-only" >Usuario</label>
					                        	<input type="text" ref="usuario" name="form-username" placeholder="Usuario..." className="form-username form-control" id="form-username" />
					                        </div>
					                        <div className="form-group">
					                        	<label className="sr-only" >Contraseña</label>
					                        	<input type="password" ref="password" name="form-password" placeholder="Contraseña..." className="form-password form-control" id="form-password" />
					                        </div>
											<button onClick={(event) => this.handleClick(event)} className="btn-inicio">
												Ingresar
											</button>
											{this.props.autenticacion.errorMessage &&
												<p>{this.props.autenticacion.errorMessage}</p>
											}
					                    </form>
				                    </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		  );
	}
};

const mapStateToProps = function(store) {
	console.log("store autenticacion",store);
  return {
	  autenticacion 	 : store.autenticacionState,
  };
};

export default connect(mapStateToProps)(Inicio);
