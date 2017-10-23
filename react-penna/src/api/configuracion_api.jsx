
import axios from 'axios';
// import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import {updatePasswordSuccess} from '../actions/configuracion_actions';



export function updatePassword(data) {
   var args={
             metodo  : 'put',
             url     : 'password',
             params  : data,
             callback: updatePasswordSuccess
          };

   return DbCall.DbCall(args);
}
