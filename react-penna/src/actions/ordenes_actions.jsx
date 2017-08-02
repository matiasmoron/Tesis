import * as types from '../actions/action-types';


////////////////
//ABM ORDENES //
////////////////

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


export function addOrdenSuccess(bienes_solicitud) {
  return {
    type: types.ADD_ORDEN_TRABAJO_SUCCESS,
    bienes_solicitud
  };
}

/**
 * Obtiene los datos de una orden en particular sin los detalles (Funcion : Ver mas)
 */
export function getOrdenSuccess(orden) {
  return {
    type: types.GET_ORDEN_TRABAJO_SUCCESS,
    orden
  };
}


////////////////
//VER ORDENES //
////////////////

/**
 * Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
 */
export function getOrdenesSuccess(ordenes) {
console.log("ACTIOn",ordenes);
  return {
    type: types.GET_ORDENES_SUCCESS,
    ordenes
  };
}
