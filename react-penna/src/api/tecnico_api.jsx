
import axios from 'axios';
import store from '../store';
import { getTecnicosSuccess,getPersonalSuccess,addSuccess } from '../actions/tecnico_actions';

/**
 * Obtiene todos los servicios
 *
 * @return [type]
 */

export function getTecnicos() {
  return axios.get('http://localhost:8000/api/tecnicos')
    .then(response => {
      store.dispatch(getTecnicosSuccess(response.data));
      return response.data;
    });
}

export function getPersonal(dni) {
  return axios.post('http://localhost:8000/api/tecnico_personal',"dni="+dni+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(response => {
      store.dispatch(getPersonalSuccess(response.data));
      return response.data;
    });
}

export function addElemento(nombre) {
  return axios.post('http://localhost:8000/api/tecnicos',"nombre="+nombre+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(addSuccess());
     return data;
   });
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
