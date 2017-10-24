var React = require('react');

import * as configuracionApi from '../../api/configuracion_api';
import {showMsg} from '../../api/msg_alert_api';
import {Input2,Formulario,habilitarSubmit,resetForm} from '../genericos/FormElements';

class PanelConfiguracion extends React.Component {
    constructor() {
      	super();
		this.state= {
			validator : this.initValidator()
		}
	}

	initValidator(){
		return {
			passAnterior :{
			  required : true
			},
			passNueva :{
			   required : true
		   },
			passNuevaCheck :{
				required : true
			}
		}
	}
    componentDidMount(){
    }

    callbackSubmit(){

        if(this._passNueva.value != this._passNuevaCheck.value){
            showMsg("Las contraseñas ingresadas deben ser iguales","error");
            return;
        }
        // var promesa = configuracionApi.updatePassword({passAnterior:this._passAnterior.value,passNueva:this._passNueva.value);

        // promesa.then( valor => {
        //     configuracionApi.getServicios();
        //     resetForm("form_configuracion");
        //     this.setState({validator:this.initValidator()});
        //     showMsg("La contraseña fué actualizada correctamente","ok");
        // });
    }

    _updatePassword(event){
        event.preventDefault();
        console.log();

        let obj = this.state.validator;
        habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

    render() {
      return (
        <div className="col-md-3">
            <Formulario titulo="Configuración" id="form_configuracion" submit={this._updatePassword.bind(this)}>
                <div className="row">
                    <Input2
						clases="form-group col-md-12"
						validator={this.state.validator.passAnterior}
						label="Contraseña anterior"
						valor={input => this._passAnterior = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passAnterior:p1})})}
					/>
				</div>
				<div className="row">
                    <Input2
						clases="form-group col-md-12"
						validator={this.state.validator.passNueva}
						label="Contraseña nueva"
						valor={input => this._passNueva = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passNueva:p1})})}
					/>
                </div>
                <div className="row">
                    <Input2
						clases="form-group  col-md-12"
						validator={this.state.validator.passNuevaCheck}
						label="Repetir contraseña"
						valor={input => this._passNuevaCheck = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passNuevaCheck:p1})})}
					/>
                </div>
                <div className="btn-form">
                    <button type="submit" className="btn btn-success">Cambiar contraseña</button>
                </div>
            </Formulario>
        </div>
      );
    }
}




export default (PanelConfiguracion);
