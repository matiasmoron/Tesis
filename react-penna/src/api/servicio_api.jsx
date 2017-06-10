
import axios from 'axios';
import store from '../store';
import { getServiciosSuccess,addServicioSuccess,updateServicioSuccess, deleteServicioSuccess } from '../actions/servicio_actions';

/**
 * Obtiene todos los servicios
 *
 * @return [type]
 */

export function getServicios() {
  return axios.get('http://localhost:8000/api/servicios')
    .then(response => {
      store.dispatch(getServiciosSuccess(response.data));
      return response.data;
    });
}

export function addServicio(nombre) {
  return axios.post('http://localhost:8000/api/servicios',"nombre="+nombre+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(addServicioSuccess());
     return data;
   });
}

export function updateServicio(servicio) {
  return axios.put('http://localhost:8000/api/servicios',"id_servicio="+servicio.id+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(updateServicioSuccess(servicio));
     return data;
   });
}

export function deleteServicio(id_servicio) {
  return axios({method: 'delete',url:'http://localhost:8000/api/servicios',params: {id_servicio:id_servicio},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(deleteServicioSuccess(id_servicio));
     return data;
   });
}
