
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/equipo_actions';

export function getEquipos() {
    var args={metodo:'get',
              url:'equipos',
              params:{},
              callback:getSuccess

           };
    DbCall.DbCall(args);
}

export function addEquipo(equipo) {
   var args={metodo:'post',
             url:'equipos',
             params:{id_tipo_equipo:equipo.id_tipo_equipo,id_equipo_padre:equipo.id_equipo_padre,
			 		cod_patrimonial:equipo.cod_patrimonial,id_servicio:equipo.id_servicio,
					descripcion:equipo.descripcion},
             callback:addSuccess
          };
   DbCall.DbCall(args);
}


export function updateEquipo(equipo) {
   var args={metodo:'put',
             url:'equipos',
             params:{id_tipo_equipo:equipo.id_tipo_equipo,id_equipo_padre:equipo.id_equipo_padre,
			 		cod_patrimonial:equipo.cod_patrimonial,id_servicio:equipo.id_servicio,
					descripcion:equipo.descripcion,id_equipo:equipo.id_equipo},
             callback:updateSuccess,
             callbackParams:{id_tipo_equipo:equipo.id_tipo_equipo,id_equipo_padre:equipo.id_equipo_padre,
					 		cod_patrimonial:equipo.cod_patrimonial,id_servicio:equipo.id_servicio,
							descripcion:equipo.descripcion,id_equipo:equipo.id_equipo}
          };
   DbCall.DbCall(args);
}


export function deleteEquipo(id_equipo) {
   var args={metodo:'delete',
             url:'http://localhost:8000/api/equipos',
             params:{id_equipo:id_equipo},
             callback:deleteSuccess,
             callbackParams: id_equipo
          };
   DbCall.DbCall(args);
}
