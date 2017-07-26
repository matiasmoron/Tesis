import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 bienes: []
};

const ordenesReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_BIENES_SUCCESS:
      return Object.assign({}, state, { bienes: action.bienes });

  }

  return state;

}

export default ordenesReducer;
