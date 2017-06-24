
import axios from 'axios';
import store from '../store';
import { getPuestosSuccess,addPuestoSuccess,updatePuestoSuccess, deletePuestoSuccess } from '../actions/puesto_actions';

export function getPuestos() {
  return axios({method: 'get',url:'http://localhost:8000/api/puestos',headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(response => {
      store.dispatch(getPuestosSuccess(response.data));
      return response.data;
    });
}

export function addPuesto(nombre) {
  return axios({method: 'post',url:'http://localhost:8000/api/puestos',params: {nombre:nombre},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(addPuestoSuccess());
     return data;
   });
}


export function updatePuesto(puesto) {
  return axios({method: 'put',url:'http://localhost:8000/api/puestos',params: {id_puesto:puesto.id_puesto,nombre:puesto.nombre},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(updatePuestoSuccess(puesto));
     return data;
   });
}


export function deletePuesto(id_puesto) {
  return axios({method: 'delete',url:'http://localhost:8000/api/puestos',params: {id_puesto:id_puesto},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(data => {
     store.dispatch(deletePuestoSuccess(id_puesto));
     return data;
   });
}
