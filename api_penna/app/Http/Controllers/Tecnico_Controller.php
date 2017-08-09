<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tecnico;

class Tecnico_Controller extends Controller
{
    public function get_tecnicos(Request $request){
        $params = array();
        $query='SELECT
                    tecnico.legajo,
                    CONCAT (personal.apellido,", ",personal.nombre) as nombre_apellido,
                    personal.dni,
                    entidad.nombre as entidad,
                    entidad.id_entidad,
                    CONCAT(tecnico.legajo,",",entidad.id_entidad) as tecnico_key
                FROM
                    personal
                INNER JOIN
                    tecnico USING (legajo)
                INNER JOIN
                    entidad USING (id_entidad)
                WHERE
                    personal.estado='.ALTA;


        if(isset($request->id_entidad)){
            $query.=' AND tecnico.id_entidad=?';
            array_push($params,$request->id_entidad);
        }

        if(isset($request->legajo)){
            $query.=' AND tecnico.legajo=?';
            array_push($params,$request->legajo);
        }


        return $this->execute_simple_query("select",$query,$params);
    }

    public function get_entidades_no_asignadas(Request $request){
        $params = array();
        array_push($params,$request-> legajo);
        $query="SELECT
                    e.id_entidad,
                    e.nombre
                FROM entidad e
                WHERE e.estado=1
                AND e.id_entidad not in (
                                            SELECT t.id_entidad
                                            FROM tecnico t
                                            WHERE t.legajo=?
                                        )";

        return $this->execute_simple_query("select",$query,$params);
    }

    public function add_tecnico(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $params2=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO tecnico (legajo,id_entidad)
                VALUES(?,?)';

        array_push($params,$request->legajo);
        array_push($params,$request->id_entidad);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT
                        t.legajo, CONCAT (p.apellido,' ',p.nombre) as nombre, e.nombre as entidad, e.id_entidad
                    FROM
                        tecnico t
                    INNER JOIN
                        entidad e  USING(id_entidad)
                    INNER JOIN
                        personal p USING(legajo)
                    where t.legajo=? AND t.id_entidad=?";

        array_push($params2,$request->legajo);
        array_push($params2,$request->id_entidad);
        array_push($array_params,$params2);

        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function remove_tecnico(Request $request){
        $params= array();
        $query='DELETE
                FROM   tecnico
                WHERE  legajo=?
                       AND id_entidad=?';

        array_push($params,$request->legajo);
        array_push($params,$request->id_entidad);


        return $this->execute_simple_query("delete",$query,$params);
    }

}
