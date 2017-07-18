<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;

class Equipo_Controller extends Controller
{
    public function get_equipos($id_equipo=null){
        $params= array();
        $query='SELECT
                    *
                FROM  equipo
                WHERE estado='.ALTA;

        if(isset($id_equipo)){
            $query.=' AND id_equipo=?';
            array_push($params,$id_equipo);
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
        $query[1]= "SELECT * FROM equipo where id_equipo=last_insert_id()";
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