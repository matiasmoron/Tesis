
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getEntidadesSuccess,addEntidadSuccess,updateEntidadSuccess, deleteEntidadSuccess } from '../actions/entidad_actions';

export function getEntidades() {
    var args={metodo:'get',
              url:'http://localhost:8000/api/entidades',
              params:{},
              callback:getEntidadesSuccess

           };
    DbCall.DbCall(args);
}

export function addEntidad(entidad) {
   var args={metodo:'post',
             url:'http://localhost:8000/api/entidades',
             params:{tipo_entidad:entidad.tipo_entidad,nombre:entidad.nombre},
             callback:addEntidadSuccess
          };
   DbCall.DbCall(args);
}


export function updateEntidad(entidad) {
   var args={metodo:'put',
             url:'http://localhost:8000/api/entidades',
             params:{id_entidad:entidad.id_entidad,nombre:entidad.nombre},
             callback:updateEntidadSuccess
          };
   DbCall.DbCall(args);
}


export function deleteEntidad(id_entidad) {
   var args={metodo:'delete',
             url:'http://localhost:8000/api/entidades',
             params:{id_entidad:id_entidad},
             callback:deleteEntidadSuccess,
             callbackParams: id_entidad
          };
   DbCall.DbCall(args);
}
