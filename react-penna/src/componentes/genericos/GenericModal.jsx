var React = require('react');
import {ModalBs} from './ModalBs';
import {Boton} from './FormElements';

export const GenericModal = (props) => {
    return (
        <div>
            <ModalBs show={props.show} onHide={props.onHide} titulo="Confirmar">
                <div className="modal-body">
                    <div className="row">
                        {props.body}
                    </div>
                    <div className="botonera">
                        <div className="btn-form">
                            <Boton onClick={props.onHide} clases="btn-danger" label="sdasd"/>
                        </div>
                        <div className="btn-form">
                            <Boton onClick={props.accion} clases="btn-success" label="Aceptar"/>
                        </div>
                    </div>
                </div>
            </ModalBs>
        </div>
    );
}
