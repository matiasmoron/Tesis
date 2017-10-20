
import store from '../store';
import {hideErrorServer,showErrorServer} from '../actions/error_server_actions';

export function HideError() {
    store.dispatch(hideErrorServer());
}

export function ShowError(msg,timeout=2000) {
    store.dispatch(showErrorServer(msg,timeout));
}
