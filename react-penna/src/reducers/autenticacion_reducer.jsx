import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 isFetching: false,
 isAuthenticated: localStorage.getItem('id_token') ? true : false
};

const autenticacionReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
	});
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
	});
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
	});
  }

  return state;

}

export default autenticacionReducer;
