import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 bienes: [], //Son todos los bienes que se usan en  los filtros
 bienes_tabla:[],//Una vez aplicados los filtros son los bienes que te muestran en la tabla
 orden:[],
 ordenes_tabla:[]//Las ordenes que se muestran en la tabla de ver y administrar luego de aplicar los filtros
};

const ordenesReducer = function(state = initialState, action) {
  switch(action.type) {

    ////////////////
    //ABM ORDENES //
    ////////////////

    case types.GET_BIENES_SUCCESS:
      return Object.assign({}, state, { bienes: action.bienes });

    case types.GET_BIENES_TABLAS_SUCCESS:
      return Object.assign({}, state, { bienes_tabla: action.bienes_solicitud });

    case types.ADD_ORDEN_TRABAJO_SUCCESS:
      return Object.assign({}, state);

    case types.GET_ORDEN_TRABAJO_SUCCESS:
      return Object.assign({}, state, {orden: action.orden[0]});

    ////////////////
    //VER ORDENES //
    ////////////////

    case types.GET_ORDENES_SUCCESS:
      return Object.assign({}, state, {ordenes_tabla: action.ordenes});

    case types.PUT_CONFORMIDAD_ORDEN:
      return Object.assign({}, state);

    ////////////////
    //ADMIN ORDENES//
    ////////////////

    case types.DERIVAR_ORDEN:
      return Object.assign({}, state);

    case types.ASIGNAR_ORDEN:
      return Object.assign({}, state);

    case types.ACTUALIZAR_ORDEN:
      return Object.assign({}, state);

  }

  return state;

}

export default ordenesReducer;
