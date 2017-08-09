
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/equipo_actions';

export function getEquipos(equipo) {
    var args={metodo:'get',
              url:'equipos',
              params:equipo,
              callback:getSuccess
           };
    return DbCall.DbCall(args);
}

export function addEquipo(equipo) {
   var args={metodo:'post',
             url:'equipos',
             params:equipo,
             callback:addSuccess
          };
   return DbCall.DbCall(args);
}


export function updateEquipo(equipo) {
   var args={metodo:'put',
             url:'equipos',
             params:equipo,
             callback:updateSuccess
          };
   return DbCall.DbCall(args);
}


export function deleteEquipo(id_equipo) {
   var args={metodo:'delete',
             url:'equipos',
             params:{id_equipo:id_equipo},
             callback:deleteSuccess,
             callbackParams: id_equipo
          };
   return DbCall.DbCall(args);
}
