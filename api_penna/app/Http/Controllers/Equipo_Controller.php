<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;

class Equipo_Controller extends Controller
{
    public function get_equipos(Request $request){
        $params= array();
        $query='SELECT
                    e.id_equipo,
                    e.id_tipo_equipo,
                    e.id_equipo_padre,
                    e.cod_patrimonial,
                    e.descripcion,
                    s.id_servicio,
                    s.nombre as servicio_nombre
                FROM  equipo e
                INNER JOIN servicio s USING(id_servicio)
                WHERE estado='.ALTA;

        if(isset($request->id_equipo)){
            $query.=' AND e.id_equipo=?';
            array_push($params,$request->id_equipo);
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

    public function add_equipo(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO equipo (id_tipo_equipo,id_equipo_padre,cod_patrimonial,id_servicio,descripcion,estado)
                VALUES(?,?,?,?,?,'.ALTA.')';

        array_push($params,$request->id_tipo_equipo);
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->id_servicio);
        array_push($params,$request->descripcion);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT
                        e.id_equipo,e.id_tipo_equipo,e.id_equipo_padre,e.cod_patrimonial,e.descripcion,
                        s.nombre as servicio_nombre
                    FROM equipo e
                    INNER JOIN servicio s USING(id_servicio)
                    WHERE id_equipo=last_insert_id()";
        array_push($array_params,array());

        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function remove_equipo(Request $request){
        $params= array();
        $query='UPDATE equipo
        		    SET    estado='.BAJA.'
                WHERE  id_equipo=?';

        array_push($params,$request->id_equipo);

        return $this->execute_simple_query("update",$query,$params);

    }

    public function update_equipo(Request $request){
        $params= array();
        $query='UPDATE equipo
                SET    id_tipo_equipo=?,
                       id_equipo_padre=?,
                       cod_patrimonial=?,
                       id_servicio=?,
                       descripcion=?
                WHERE  id_equipo=?';

        array_push($params,$request->id_tipo_equipo);
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->id_servicio);
        array_push($params,$request->descripcion);;
        array_push($params,$request->id_equipo);


        return $this->execute_simple_query("update",$query,$params);
    }
}
