import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 servicios: [
 		]
};

const servicioReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_SERVICIOS_SUCCESS:
      return Object.assign({}, state, { servicios: action.servicios });

    case types.ADD_SERVICIOS_SUCCESS:
        // var nuevo_servicio=[];
        // nuevo_servicio.push(state.servicios);
        // nuevo_servicio[0].push(action.servicio);
        // return {servicios: nuevo_servicio[0]};
        return Object.assign({}, state);

    case types.DELETE_SERVICIOS_SUCCESS:
      const newServicios = _.filter(state.servicios, servicio => servicio.id_servicio != action.id_servicio);
      return Object.assign({}, state, { servicios: newServicios });
  }

  return state;

}

export default servicioReducer;
