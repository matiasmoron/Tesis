
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/personal_actions';

export function getPersonal() {
    var args={metodo:'get',
              url:'personal',
              params:{},
              callback:getSuccess

           };
    return DbCall.DbCall(args);
}

export function addPersonal(personal) {
    console.log("entro a personal_api",personal);
   var args={metodo:'post',
             url:'personal',
             params:{legajo:personal.legajo,usuario:personal.usuario,
				 	nombre:personal.nombre,apellido:personal.apellido,
			 		dni:personal.dni,id_servicio:personal.id_servicio,
					id_puesto:personal.id_puesto,fecha_ingreso:personal.fecha_ingreso},
             callback:addSuccess
          };
   return DbCall.DbCall(args);
}


export function updatePersonal(personal) {
   var args={metodo:'put',
             url:'personal',
             params:{usuario:personal.usuario,legajo:personal.legajo,
				 	nombre:personal.nombre,apellido:personal.apellido,
			 		dni:personal.dni,fecha_ingreso:personal.fecha_ingreso},
             callback:updateSuccess
          };
   return DbCall.DbCall(args);
}


export function deletePersonal(legajo) {
   var args={metodo:'delete',
             url:'personal',
             params:{legajo:legajo},
             callback:deleteSuccess,
             callbackParams: legajo
          };
   return DbCall.DbCall(args);
}
