import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 display_error: false,
 msg_error: ""
};

const errorServerReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.SHOW_ERROR:
      return Object.assign({}, state, { display_error: true, msg_error: action.msg });

	case types.HIDE_ERROR:
      return Object.assign({}, state, { display_error: false, msg_error: "" });

  }

  return state;

}

export default errorServerReducer;
