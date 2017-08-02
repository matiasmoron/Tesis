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
                    e.id_equipo as id_bien,
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
        return $this->execute_simple_query("select",$query,$params);
    }

    //Obtiene las ordenes de trabajo segun los filtros ingresados
    public function get_ordenes(Request $request){
        switch ($request->id_tipo_bien) {
            case EQUIPO:
                return $this->get_ordenes_equipo($request);
                break;

            /*case PRESTACION:
                return Equipo_Controller::get_equipos($request);
                break;*/
        }
    }

    /**
     * Obtiene las ordenes de trabajo con sus detalles
     * @param  filtros de la consulta  $request array(
     *                                     id_bien = id del equipo
     *                                     cod_patrimonial= cod del equipo
     *                                     id_servicio = id del Servicio
     *                                     estado= el id_estado de la orden del trabajo
     *                                     fecha_ini = fecha de creacion desde donde se solicitan las ordenes de trabajo
     *                                     fecha_fin= fecha de creación hasta donde se solicitan las ordenes de trabajo
     *                             )
     * @return {[type]
     */
    private function get_ordenes_equipo($request){
        $query="SELECT
                    ot.id_orden_trabajo,ot.id_tipo_bien,ot.id_bien,e.descripcion as bien_descripcion,
                    CONCAT(p.apellido,' ',p.nombre) as p_creacion,CONCAT(p1.apellido,' ',p1.nombre) as p_recepcion,
                    date_format(ot.fecha_creacion,'%d/%m/%Y') as fecha_creacion,ot.obs_creacion,ot.obs_devolucion,ot.estado,
                    date_format(otd.fecha_ini,'%d/%m/%Y') as fecha_inicio,date_format(otd.fecha_fin,'%d/%m/%Y') as fecha_fin,
                    otd.hs_insumidas,otds.conformidad
                FROM
                    orden_trabajo ot
                LEFT JOIN
                    orden_trabajo_detalle otd
                    USING (id_orden_trabajo)
                LEFT JOIN
                    personal p1
                    ON ot.leg_creacion=p1.legajo
                LEFT JOIN
                    personal p2
                    ON ot.leg_recepcion=p2.legajo
                LEFT JOIN
                    equipo e
                    ON e.id_equipo=ot.id_bien
                WHERE 1=1 ".$whr."
                ORDER BY
                    ot.fecha_creacion desc
        ";

        if(isset($request->id_bien)){
            $whr.=' AND e.id_equipo=?';
            array_push($params,$request->id_bien);
        }
        if(isset($request->cod_patrimonial)){
            $whr.=' AND e.cod_patrimonial=?';
            array_push($params,$request->cod_patrimonial);
        }
        if(isset($request->id_servicio)){
            $whr.=' AND ot.id_servicio=?';
            array_push($params,$request->id_servicio);
        }
        if(isset($request->estado)){
            $whr.=' AND ot.estado=?';
            array_push($params,$request->estado);
        }
        if(isset($request->id_entidad)){
            $whr.=' AND ot.entidad_destino=?';
            array_push($params,$request->id_entidad);
        }
        if(isset($request->fecha_ini)){
            $whr.=' AND ot.fecha_creacion => str_to_date("?","%d %m %Y")';
            array_push($params,$request->fecha_ini);
        }
        if(isset($request->fecha_fin)){
            $whr.=' AND ot.fecha_creacion <= str_to_date("?","%d %m %Y")';
            array_push($params,$request->fecha_fin);
        }

        return $this->execute_simple_query("select",$query,$params);

    }

    public function add_orden(Request $request){
        $params=array();

        $query='INSERT INTO orden_trabajo(id_tipo_bien,id_bien,fecha_creacion,tipo_entidad,entidad_destino,
                                    obs_creacion,estado)
                VALUES(?,?,NOW(),?,?,?,1)';

        array_push($params,$request->id_tipo_bien);
        array_push($params,$request->id_bien);
        array_push($params,$request->tipo_entidad);
        array_push($params,$request->entidad_destino);
        array_push($params,$request->obs_creacion);

        return $this->execute_simple_query("insert",$query,$params);
    }


    /**
     * Obtiene los datos de la orden de trabajo
     * @param  $request => id_orden_trabajo
     */
    public function get_orden_trabajo(Request $request){
        $params= array();
        $query='SELECT
                    ot.id_orden_trabajo,
                    ot.obs_creacion,
                    date_format(ot.fecha_creacion,"%d/%m/%Y") as fecha_creacion,
                    ot.leg_creacion,
                    ot.leg_recepcion
                FROM orden_trabajo ot
                WHERE
                    id_orden_trabajo=?';

        array_push($params,$request->id_orden_trabajo);
        return $this->execute_simple_query("select",$query,$params);
    }

}
