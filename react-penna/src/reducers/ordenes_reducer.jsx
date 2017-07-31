import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 bienes: [],
 bienes_tabla:[],
 orden:{result:false}
};

const ordenesReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_BIENES_SUCCESS:
      return Object.assign({}, state, { bienes: action.bienes });

    case types.GET_BIENES_TABLAS_SUCCESS:
      return Object.assign({}, state, { bienes_tabla: action.bienes_solicitud });

    case types.ADD_ORDEN_TRABAJO_SUCCESS:
      return Object.assign({}, state, { orden:{result:true} });

  }

  return state;

}

export default ordenesReducer;
