import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 personal: []
};

const personalReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_PERSONAL_SUCCESS:
      return Object.assign({}, state, { personal: action.personal });

    case types.ADD_PERSONAL_SUCCESS:
        var nuevo_personal=[];
        state.personal.map((personal) =>
            nuevo_personal.push(personal)
        );
        nuevo_personal.push(action.personal[0]);
        return Object.assign({}, {personal:nuevo_personal});

    case types.UPDATE_PERSONAL_SUCCESS:
        return Object.assign({}, state);
        // var newPersonal = _.filter(state.personal, personal => personal.legajo != action.personal.legajo);
        // newPersonal.push(action.personal);
        // return Object.assign({}, {personal:newPersonal});

    case types.DELETE_PERSONAL_SUCCESS:
      const newPersonal = _.filter(state.personal, personal => personal.legajo != action.legajo);
      return Object.assign({}, state, { personal: newPersonal });
  }

  return state;

}

export default personalReducer;
