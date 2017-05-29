
import axios from 'axios';
import store from '../store';
import { getPuestosSuccess,addPuestoSuccess, deletePuestoSuccess } from '../actions/puesto_actions';

export function getPuestos() {
  return axios.get('http://localhost:8000/api/puestos')
    .then(response => {
      store.dispatch(getPuestosSuccess(response.data));
      return response.data;
    });
}

export function addPuesto(nombre) {
  return axios.post('http://localhost:8000/api/puestos',"nombre="+nombre+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(addPuestoSuccess());
     return data;
   });
}

export function deletePuesto(id_puesto) {
  return axios.delete('http://localhost:8000/api/puestos',"id_puesto="+id_puesto+"",{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(deletePuestoSuccess(id_puesto));
     return data;
   });
}
