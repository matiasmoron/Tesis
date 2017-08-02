
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import {getSuccess,getBienesTablasSuccess,addOrdenSuccess,getOrdenSuccess,getOrdenesSuccess} from '../actions/ordenes_actions';

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
              callback:addOrdenSuccess
           };
    return DbCall.DbCall(args);
}

//Obtiene los datos de la orden de trabajo
export function getOrden(filtro_orden) {
    var args={metodo:'get',
              url:'http://localhost:8000/api/ordenes',
              params:filtro_orden,
              callback:getOrdenSuccess
           };
    DbCall.DbCall(args);
}

//Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
export function getOrdenes(filtros_ordenes) {
    var args={metodo:'post',
              url:'http://localhost:8000/api/ver_ordenes',
              params:filtros_ordenes,
              callback:getOrdenesSuccess
           };
    DbCall.DbCall(args);
}
