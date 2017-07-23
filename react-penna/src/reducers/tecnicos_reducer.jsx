import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 tecnicos: [],
 tecnico_personal: [],
 tecnicos_entidades: []
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
        var nuevo_tecnicos=[];
        state.tecnicos.map((tecnico) =>
            nuevo_tecnicos.push(tecnico)
        );
        nuevo_tecnicos.push(action.tecnico[0]);

        //sacar de la lista de entidades
        const newEntidades = _.filter(state.tecnicos_entidades, entidad => entidad.id_entidad != action.tecnico[0].id_entidad);
        console.log("tecnicos_entidades reducer",newEntidades);
        return Object.assign({},state, {tecnicos:nuevo_tecnicos, tecnicos_entidades:newEntidades ,tecnico_personal:[]});

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
