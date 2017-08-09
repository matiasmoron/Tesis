var React = require('react');
import {ModalBs} from '../../genericos/ModalBs';
import {Boton,Label} from '../../genericos/FormElements';


export const VerMasModal = (props) => {
  return (
          <div>
			<ModalBs show={props.show} onHide={props.onHide} titulo="Detalles orden de trabajo">
				<div className="modal-body">
					<div className="row">
						<Label clases="col-md-6" label="Autor-orden" value={props.datosOrden.p_creacion}/>
						<Label clases="col-md-6" label="Fecha Creación" value={props.datosOrden.fecha_creacion}/>
					</div>
					<div className="row">
						<Label clases="col-md-6" label="Entidad destino" value={props.datosOrden.entidad_destino}/>
						<Label clases="col-md-6" label="Tomado por" value={props.datosOrden.p_recepcion}/>
					</div>
					<div className="row">
						<Label label="Observación creación" value={props.datosOrden.obs_creacion}/>
						<Label label="Observación devolución" value={props.datosOrden.obs_devolucion}/>
					</div>
					<div className="row">
						<Label label="Conformidad" value={props.datosOrden.conformidad}/>
					</div>
					<div className="btn-form">
						<Boton onClick={props.onHide} clases="btn-primary" label="Cerrar"/>
					</div>
				</div>
			</ModalBs>
        </div>
		);
}
