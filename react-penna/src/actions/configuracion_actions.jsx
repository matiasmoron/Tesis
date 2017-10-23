import * as types from '../actions/action-types';


export function updatePasswordSuccess(password) {
  return {
    type: types.UPDATE_PASSWORD_SUCCESS,
    password
  };
}
