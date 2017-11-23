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
                    <div className="d-inline">
                        <div className="btn-form">
                            <Boton onClick={props.onHide} clases="btn-primary" label="Cerrar"/>
                        </div>
                        <div className="btn-form">
                            <Boton onClick={props.accion} clases="btn-primary" label="Aceptar"/>
                        </div>
                    </div>
                </div>
            </ModalBs>
        </div>
    );
}
