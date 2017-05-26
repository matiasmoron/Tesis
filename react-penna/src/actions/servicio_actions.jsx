import * as types from '../actions/action-types';

export function getServiciosSuccess(servicios) {
  return {
    type: types.GET_SERVICIOS_SUCCESS,
    servicios
  };
}

export function addServiciosSuccess() {
  return {
    type: types.ADD_SERVICIOS_SUCCESS
  };
}

export function deleteServicioSuccess(id_servicio) {
  return {
    type: types.DELETE_SERVICIOS_SUCCESS,
    id_servicio
  };
}
