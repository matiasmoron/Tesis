<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Orden_trabajo;
const EQUIPO=1;
const PRESTACION=2;
class Orden_Trabajo_Controller extends Controller
{
    public function get_bienes_solicitud(Request $request){
        switch ($request->id_tipo_bien) {
            case EQUIPO:
                return $this->get_equipos_solicitud($request);
                break;

            /*case PRESTACION:
                return Equipo_Controller::get_equipos($request);
                break;*/
        }
    }

    private function get_equipos_solicitud(Request $request){
        $params= array();
        $query='SELECT
                    e.id_equipo,
                    ot.id_orden_trabajo,
                    "1" as id_tipo_bien,
                    IFNULL(ot.obs_creacion,"-") as obs_creacion,
                    IFNULL(ot.estado,0) as estado,
                    e.descripcion,s.nombre as servicio_nombre
                FROM  equipo e
                LEFT JOIN
                    orden_trabajo ot
                    ON e.id_equipo=ot.id_bien AND ot.id_tipo_bien=1 and ot.estado IN (1,2)
                LEFT JOIN
                    servicio s
                    ON e.id_servicio=s.id_servicio
                WHERE e.estado=1';

        if(isset($request->id_bien)){
            $query.=' AND e.id_equipo=?';
            array_push($params,$request->id_bien);
        }
        if(isset($request->cod_patrimonial)){
            $query.=' AND e.cod_patrimonial=?';
            array_push($params,$request->cod_patrimonial);
        }
        if(isset($request->id_servicio)){
            $query.=' AND e.id_servicio=?';
            array_push($params,$request->id_servicio);
        }
        // var_dump($query);
        return $this->execute_simple_query("select",$query,$params);
    }

}
