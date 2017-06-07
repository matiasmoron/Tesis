import * as types from '../actions/action-types';

export function getTecnicosSuccess(elementos) {
  return {
    type: types.GET_TECNICOS_SUCCESS,
    elementos
  };
}

export function getPersonalSuccess(elementos) {
  return {
    type: types.GET_PERSONALTECNICO_SUCCESS,
    elementos
  };
}

export function addSuccess() {
  return {
    type: types.ADD_TECNICO_SUCCESS
  };
}

// export function deleteSuccess(id) {
//   return {
//     type: types.DELETE_TECNICO_SUCCESS,
//     id
//   };
// }
// export function updateSuccess(elem) {
//   return {
//     type: types.UPDATE_TECNICO_SUCCESS,
//     elem
//   };
// }
