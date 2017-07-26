
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import {getSuccess} from '../actions/ordenes_actions';

export function getBienes(bienes) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/bienes',
              params:bienes,
              callback:getSuccess
           };
    DbCall.DbCall(args);
}
