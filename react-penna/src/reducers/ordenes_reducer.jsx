import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 bienes: [],
 bienes_tabla:[]
};

const ordenesReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_BIENES_SUCCESS:
      return Object.assign({}, state, { bienes: action.bienes });

    case types.GET_BIENES_TABLAS_SUCCESS:
      return Object.assign({}, state, { bienes_tabla: action.bienes_solicitud });

  }

  return state;

}

export default ordenesReducer;
