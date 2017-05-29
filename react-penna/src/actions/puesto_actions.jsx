import * as types from '../actions/action-types';

export function getPuestosSuccess(puestos) {
  return {
    type: types.GET_PUESTOS_SUCCESS,
    puestos
  };
}

export function addPuestoSuccess() {
  return {
    type: types.ADD_PUESTO_SUCCESS
  };
}

export function deletePuestoSuccess(id_puesto) {
  return {
    type: types.DELETE_PUESTO_SUCCESS,
    id_puesto
  };
}
