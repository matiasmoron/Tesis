
import axios from 'axios';
import store from '../store';
import { getServiciosSuccess, deleteServicioSuccess } from '../actions/servicio_actions';

/**
 * Obtiene todos los servicios
 *
 * @author Sebastián Biscussi
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
