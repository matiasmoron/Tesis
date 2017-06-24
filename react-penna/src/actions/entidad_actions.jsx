import * as types from '../actions/action-types';

export function getEntidadesSuccess(entidades) {
    console.log("action",entidades);
  return {
    type: types.GET_ENTIDADES_SUCCESS,
    entidades
  };
}

export function addEntidadSuccess() {
  return {
    type: types.ADD_ENTIDAD_SUCCESS
  };
}

export function deleteEntidadSuccess(id_puesto) {
  return {
    type: types.DELETE_ENTIDAD_SUCCESS,
    id_entidad,
	tipo_etidad
  };
}

export function updateEntidadSuccess(entidad) {
  return {
    type: types.UPDATE_ENTIDAD_SUCCESS,
    entidad
  };
}
