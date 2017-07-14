import * as types from '../actions/action-types';

export function getSuccess(solicitudes) {
  return {
    type: types.GET_SOLICITUD_SUCCESS,
    solicitudes
  };
}

export function addSuccess(solicitud) {
  return {
    type: types.ADD_SOLICITUD_SUCCESS,
    solicitud
  };
}

export function deleteSuccess(id_solicitud) {
  return {
    type: types.DELETE_SOLICITUD_SUCCESS,
    id_solicitud
  };
}

export function updateSuccess(solicitud) {
  return {
    type: types.UPDATE_SOLICITUD_SUCCESS,
    solicitud
  };
}
