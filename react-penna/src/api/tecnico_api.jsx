
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getTecnicosSuccess,getPersonalSuccess,getTecnicoEntidadSuccess,addSuccess,deleteSuccess } from '../actions/tecnico_actions';



//Para completar la tabla
export function getTecnicos(filtro_tecnico) {
    var args={metodo:'get',
              url:'tecnicos',
              params:filtro_tecnico,
              callback:getTecnicosSuccess

           };
    return DbCall.DbCall(args);
}

export function getPersonal(legajo) {
    var args={metodo:'get',
              url:'personal',
              params:{"legajo":legajo},
              callback:getPersonalSuccess

           };
    return DbCall.DbCall(args);

}

//Obtiene todas las entidades a las que no pertenece el empleado con el legajo ingresado
export function getTecnicoEntidad(legajo) {
    var args={metodo:'post',
              url:'tecnico_entidad',
              params:{"legajo":legajo},
              callback:getTecnicoEntidadSuccess

           };
    return DbCall.DbCall(args);
}

//Agrega un nuevo técnico
export function addElemento(legajo,id_entidad) {
   var args={metodo:'post',
             url:'tecnicos',
             params:{legajo:legajo,id_entidad:id_entidad},
             callback:addSuccess
          };
   return DbCall.DbCall(args);
}


export function deleteElemento(tecnico) {
   var args={metodo:'delete',
             url:'tecnicos',
             params:{id_entidad:tecnico.id_entidad,legajo: tecnico.legajo },
             callback:deleteSuccess,
             callbackParams: {id_entidad:tecnico.id_entidad,legajo: tecnico.legajo }
          };
   return DbCall.DbCall(args);
}
