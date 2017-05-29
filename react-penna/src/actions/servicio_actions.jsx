import * as types from '../actions/action-types';

export function getServiciosSuccess(servicios) {
  return {
    type: types.GET_SERVICIOS_SUCCESS,
    servicios
  };
}

export function addServicioSuccess() {
  return {
    type: types.ADD_SERVICIO_SUCCESS
  };
}

export function deleteServicioSuccess(id_servicio) {
  return {
    type: types.DELETE_SERVICIO_SUCCESS,
    id_servicio
  };
}
