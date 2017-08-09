
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getTecnicosSuccess,getPersonalSuccess,getTecnicoEntidadSuccess,addSuccess,deleteSuccess } from '../actions/tecnico_actions';

/**
 * Obtiene todos los servicios
 *
 * @return [type]
 */

//Para completar la tabla
export function getTecnicos(filtro_tecnico) {
    var args={metodo:'get',
              url:'tecnicos',
              params:filtro_tecnico,
              callback:getTecnicosSuccess

           };
    DbCall.DbCall(args);
}

export function getPersonal(legajo) {
    var args={metodo:'get',
              url:'personal',
              params:{"legajo":legajo},
              callback:getPersonalSuccess

           };
    DbCall.DbCall(args);

}

//Obtiene todas las entidades a las que no pertenece el empleado con el legajo ingresado
export function getTecnicoEntidad(legajo) {
    var args={metodo:'post',
              url:'tecnico_entidad',
              params:{"legajo":legajo},
              callback:getTecnicoEntidadSuccess

           };
    DbCall.DbCall(args);
}
export function addElemento(legajo,id_entidad) {
   var args={metodo:'post',
             url:'tecnicos',
             params:{legajo:legajo,id_entidad:id_entidad},
             callback:addSuccess
          };
   DbCall.DbCall(args);
}


export function deleteElemento(tecnico) {
   var args={metodo:'delete',
             url:'tecnicos',
             params:{id_entidad:tecnico.id_entidad,legajo: tecnico.legajo },
             callback:deleteSuccess,
             callbackParams: {id_entidad:tecnico.id_entidad,legajo: tecnico.legajo }
          };
   DbCall.DbCall(args);
}
