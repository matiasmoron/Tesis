
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/solicitud_actions';

export function getSolicitudes() {
    var args={metodo:'get',
              url:'http://localhost:8000/api/solicitudes',
              params:{},
              callback:getSuccess

           };
    DbCall.DbCall(args);
}

export function addSolicitud(solicitud) {
   var args={metodo:'post',
             url:'http://localhost:8000/api/solicitudes',
             params:{id_bien:solicitud.id_bien,id_tipo_bien:solicitud.id_tipo_bien,
			 		id_servicio_creacion:solicitud.id_servicio_creacion,legajo_creacion:solicitud.legajo_creacion,
					legajo_recepcion:solicitud.legajo_recepcion},
             callback:addSuccess
          };
   DbCall.DbCall(args);
}


export function updateSolicitud(solicitud) {
   var args={metodo:'put',
             url:'http://localhost:8000/api/solicitudes',
             params:{id_bien:solicitud.id_bien,id_tipo_bien:solicitud.id_tipo_bien,
			 		id_servicio_creacion:solicitud.id_servicio_creacion,legajo_creacion:solicitud.legajo_creacion,
					legajo_recepcion:solicitud.legajo_recepcion,id_solicitud:solicitud.id_solicitud},
             callback:updateSuccess
          };
   DbCall.DbCall(args);
}


export function deleteSolicitud(id_solicitud) {
   var args={metodo:'delete',
             url:'http://localhost:8000/api/solicitudes',
             params:{id_solicitud:id_solicitud},
             callback:deleteSuccess,
             callbackParams: id_solicitud
          };
   DbCall.DbCall(args);
}
