import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 tecnicos: [],
 tecnico_personal: [], //Son los datos del tecnico seleccionado
 tecnicos_entidades: [] //Son las entidades que les falta a un técnico
};

const tecnicoReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.GET_TECNICOS_SUCCESS:
        return Object.assign({}, state, { tecnicos: action.elementos });

    case types.GET_PERSONALTECNICO_SUCCESS:
        console.log("tecnico_personal", action.elementos );
        return Object.assign({}, state, { tecnico_personal: action.elementos[0] });

    case types.GET_TECNICOENTIDAD_SUCCESS:
          return Object.assign({}, state, { tecnicos_entidades: action.elementos });

    case types.ADD_TECNICO_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_SERVICIO_SUCCESS:
        const newTecnicos = _.filter(state.tecnicos, tecnico => tecnico.id_entidad != action.id_entidad && tecnico.legajo != action.legajo );
        return Object.assign({}, state, { tecnicos: newTecnicos });

  }

  return state;

}

export default tecnicoReducer;
