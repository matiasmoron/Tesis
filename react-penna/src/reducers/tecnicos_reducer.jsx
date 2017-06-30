import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 tecnicos: [],
 personal: [],
 entidades: []
};

const tecnicoReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.GET_TECNICOS_SUCCESS:
        return Object.assign({}, state, { tecnicos: action.elementos });

    case types.GET_PERSONALTECNICO_SUCCESS:
        return Object.assign({}, state, { personal: action.elementos });

    case types.GET_TECNICOENTIDAD_SUCCESS:
          return Object.assign({}, state, { entidades: action.elementos });

    case types.ADD_TECNICO_SUCCESS:
        var nuevo_tecnicos=[];
        state.tecnicos.map((tecnico) =>
            nuevo_tecnicos.push(tecnico)
        );
        nuevo_tecnicos.push(action.tecnico[0]);
        return Object.assign({}, {tecnicos:nuevo_tecnicos});

    case types.DELETE_SERVICIO_SUCCESS:
        const newTecnicos = _.filter(state.tecnicos, tecnico => tecnico.id_entidad != action.id_entidad && tecnico.legajo != action.legajo );
        return Object.assign({}, state, { tecnicos: newTecnicos });

    // case types.UPDATE_SERVICIO_SUCCESS:
    //     return Object.assign({}, state);
    //
  }

  return state;

}

export default tecnicoReducer;
