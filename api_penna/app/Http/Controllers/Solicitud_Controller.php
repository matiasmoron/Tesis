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
        $query[0]='INSERT INTO solicitud (id_bien,id_tipo_bien,id_servicio_creacion,legajo_creacion,legajo_recepcion,
                                          id_entidad,fecha_creacion,estado)
                VALUES(?,?,?,?,?,?,NOW(),'.ALTA.')';

        array_push($params,$request->id_bien);
        array_push($params,$request->id_tipo_bien);
        array_push($params,$request->id_servicio_creacion);
        array_push($params,$request->legajo_creacion);
        array_push($params,$request->legajo_recepcion);
        array_push($params,$request->id_entidad);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT * FROM solicitud where id_solicitud=last_insert_id()";
        array_push($array_params,array());

        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function update_solicitud(Request $request){
        $params= array();
        $query='UPDATE solicitud
                SET    id_bien=?,
                       id_tipo_bien=?,
                       id_servicio_creacion=?,
                       legajo_creacion=?,
                       legajo_recepcion=?,
                       id_entidad=?
                WHERE  id_solicitud=?';

        array_push($params,$request->id_bien);
        array_push($params,$request->id_tipo_bien);
        array_push($params,$request->id_servicio_creacion);
        array_push($params,$request->legajo_creacion);
        array_push($params,$request->id_entidad);
        array_push($params,$request->id_solicitud);


        return $this->execute_simple_query("update",$query,$params);
    }

    public function delete_solicitud(Request $request){
        $params= array();
        $query='UPDATE solicitud
        		    SET    estado='.BAJA.'
                WHERE  id_solicitudo=?';

        array_push($params,$request->id_solicitud);

        return $this->execute_simple_query("update",$query,$params);

    }

}