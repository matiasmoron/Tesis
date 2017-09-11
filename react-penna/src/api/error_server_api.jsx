
import store from '../store';
import {hideErrorServer,showErrorServer} from '../actions/error_server_actions';

export function HideError() {
    store.dispatch(hideErrorServer());
}

export function ShowError(msg) {
    store.dispatch(showErrorServer(msg));
}
