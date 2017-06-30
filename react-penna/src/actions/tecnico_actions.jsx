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

export function getTecnicoEntidadSuccess(elementos) {
  return {
    type: types.GET_TECNICOENTIDAD_SUCCESS,
    elementos
  };
}

export function addSuccess(tecnico) {
  return {
    type: types.ADD_TECNICO_SUCCESS,
    tecnico
  };
}

export function deleteSuccess(tecnico) {
  return {
    type: types.DELETE_TECNICO_SUCCESS,
    tecnico
  };
}


// export function updateSuccess(elem) {
//   return {
//     type: types.UPDATE_TECNICO_SUCCESS,
//     elem
//   };
// }
