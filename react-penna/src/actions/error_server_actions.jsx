import * as types from '../actions/action-types';

export function hideErrorServer() {
  return {
    type: types.HIDE_ERROR
  };
}

export function showErrorServer(msg,timeout) {
  return {
    type: types.SHOW_ERROR,
	msg,
    timeout
  };
}
