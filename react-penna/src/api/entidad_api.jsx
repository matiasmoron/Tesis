
import axios from 'axios';
import store from '../store';
import { getEntidadesSuccess,addEntidadSuccess,updateEntidadSuccess, deleteEntidadSuccess } from '../actions/entidad_actions';

export function getEntidades() {
  return axios({method:'get',url:'http://localhost:8000/api/entidades'})
    .then(response => {
      store.dispatch(getEntidadesSuccess(response.data));
      console.log(response.data);
      return response.data;
    });
}

export function addEntidad(entidad) {
  return axios({method: 'post',url:'http://localhost:8000/api/entidades',params: {tipo_entidad:entidad.tipo_entidad,nombre:entidad.nombre},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(response => {
     store.dispatch(addEntidadSuccess());
     return response;
   });
}


export function updateEntidad(entidad) {
  return axios({method: 'put',url:'http://localhost:8000/api/entidades',params: {id_entidad:entidad.id_entidad,nombre:entidad.nombre},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(response => {
     store.dispatch(updateEntidadSuccess(entidad));
     return response;
   });
}


export function deleteEntidad(id_entidad) {
  return axios({method: 'delete',url:'http://localhost:8000/api/entidades',params: {id_entidad:id_entidad},headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(response => {
     store.dispatch(deleteEntidadSuccess(id_entidad));
     return response;
   });
}
