<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Solicitud;

class Solicitud_Controller extends Controller
{
    public function get_solicitudes($id_solicitud=null){
        $params= array();
        $query='SELECT
                    *
                FROM  solicitud
                WHERE estado='.ALTA;

        if(isset($id_equipo)){
            $query.=' AND id_solicitud=?';
            array_push($params,$id_solicitud);
        }

        return $this->execute_simple_query("select",$query,$params);
    }

    public function add_solicitud(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO solicitud (id_tipo_equipo,id_equipo_padre,cod_patrimonial,id_servicio,descripcion)
                VALUES(?,?,?,?,?,'.ALTA.')';

        array_push($params,$request->id_tipo_equipo);
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->id_servicio);
        array_push($params,$request->descripcion);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT * FROM solicitud where id_solicitud=last_insert_id()";
        array_push($array_params,$request->legajo);

        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function delete_solicitud(Request $request){
        $params= array();
        $query='UPDATE solicitud
        		    SET    estado='.BAJA.'
                WHERE  id_solicitudo=?';

        array_push($params,$request->id_solicitud);

        return $this->execute_simple_query("update",$query,$params);

    }

    public function update_solicitud(Request $request){
        $params= array();
        $query='UPDATE solicitud
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