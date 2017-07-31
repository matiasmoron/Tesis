
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import {getSuccess,getBienesTablasSuccess,addOrdenSucess} from '../actions/ordenes_actions';

export function getBienes(bienes) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/bienes',
              params:bienes,
              callback:getSuccess
           };
    DbCall.DbCall(args);
}

export function getBienesTablas(bienes) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/bienes_solicitud',
              params:bienes,
              callback:getBienesTablasSuccess
           };
    DbCall.DbCall(args);
}

export function addOrden(orden) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/ordenes',
              params:orden,
              callback:addOrdenSucess
           };
    DbCall.DbCall(args);
}
