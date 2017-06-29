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

    case types.ADD_SERVICIO_SUCCESS:
        console.log("action1",action.servicio);
        console.log("state",state);
        var nuevo_servicios=[];
        state.servicios.map((servicio) =>
            nuevo_servicios.push(servicio)
        );
        nuevo_servicios.push(action.servicio[0]);
        return Object.assign({}, {servicios:nuevo_servicios});

    case types.UPDATE_SERVICIO_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_SERVICIO_SUCCESS:
      const newServicios = _.filter(state.servicios, servicio => servicio.id_servicio != action.id_servicio);
      console.log("actionDelete",action);
      console.log("stateDelete",state);
      return Object.assign({}, state, { servicios: newServicios });
  }

  return state;

}

export default servicioReducer;
