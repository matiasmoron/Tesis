import * as types from '../actions/action-types';

export function getSuccess(bienes) {
  return {
    type: types.GET_BIENES_SUCCESS,
    bienes
  };
}

export function getBienesTablasSuccess(bienes_solicitud) {
  return {
    type: types.GET_BIENES_TABLAS_SUCCESS,
    bienes_solicitud
  };
}
