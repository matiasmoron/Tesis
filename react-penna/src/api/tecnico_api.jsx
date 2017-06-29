
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getTecnicosSuccess,getPersonalSuccess,getTecnicoEntidadSuccess,addSuccess } from '../actions/tecnico_actions';

/**
 * Obtiene todos los servicios
 *
 * @return [type]
 */

//Para completar la tabla
export function getTecnicos() {
    var args={metodo:'get',
              url:'http://localhost:8000/api/tecnicos',
              params:{},
              callback:getTecnicosSuccess

           };
    DbCall.DbCall(args);
}

export function getPersonal(legajo) {
    var args={metodo:'get',
              url:'http://localhost:8000/api/personal',
              params:{"legajo":legajo},
              callback:getPersonalSuccess

           };
    DbCall.DbCall(args);

}

//Obtiene todas las entidades a las que no pertenece el empleado con el legajo ingresado
export function getTecnicoEntidad(legajo) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/tecnico_entidad',
              params:{"legajo":legajo},
              callback:getTecnicoEntidadSuccess

           };
    DbCall.DbCall(args);
}
export function addElemento(legajo,entidad) {
   var args={metodo:'post',
             url:'http://localhost:8000/api/tecnicos',
             params:{legajo:legajo,entidad:entidad},
             callback:addSuccess
          };
   DbCall.DbCall(args);
}

// export function updateElemento(servicio) {
//   return axios.put('http://localhost:8000/api/tecnicos',"legajo="+servicio.id+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
//   .then(data => {
//      store.dispatch(updateServicioSuccess(servicio));
//      return data;
//    });
// }
//
// export function deleteServicio(id_servicio) {
//   return axios.delete('http://localhost:8000/api/tecnicos',"id_servicio="+id_servicio+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
//   .then(data => {
//      store.dispatch(deleteServicioSuccess(id_servicio));
//      return data;
//    });
// }
