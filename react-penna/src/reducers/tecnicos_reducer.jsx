import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 tecnicos: [
 		]
};

const tecnicoReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_SERVICIOS_SUCCESS:
      return Object.assign({}, state, { tecnicos: action.tecnicos });

    case types.ADD_SERVICIO_SUCCESS:
        return Object.assign({}, state);

    // case types.UPDATE_SERVICIO_SUCCESS:
    //     return Object.assign({}, state);
    //
    // case types.DELETE_SERVICIO_SUCCESS:
    //   const newServicios = _.filter(state.tecnicos, tecnico => tecnico.id_tecnico != action.id_tecnico);
    //   return Object.assign({}, state, { tecnicos: newServicios });
  }

  return state;

}

export default tecnicoReducer;
