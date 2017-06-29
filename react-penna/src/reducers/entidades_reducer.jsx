import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 entidades: []
};

const entidadReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_ENTIDADES_SUCCESS:
      return Object.assign({}, state, { entidades: action.entidades });

    case types.ADD_ENTIDAD_SUCCESS:
        var nuevo_entidades=[];
        state.entidades.map((entidad) =>
            nuevo_entidades.push(entidad)
        );
        nuevo_entidades.push(action.entidad[0]);
        return Object.assign({}, {entidades:nuevo_entidades});

    case types.UPDATE_ENTIDAD_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_ENTIDAD_SUCCESS:
      const newEntidades = _.filter(state.entidades, entidad => entidad.id_entidad != action.id_entidad);
      return Object.assign({}, state, { entidades: newEntidades });
  }

  return state;

}

export default entidadReducer;
