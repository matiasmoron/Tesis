import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 servicios: [
 		]
};

const servicioReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_SERVICIOS_SUCCESS:
      console.log("reducer:");console.log(Object.assign({}, state, { servicios: action.servicios }));
      return Object.assign({}, state, { servicios: action.servicios });

  }

  return state;

}

export default servicioReducer;
