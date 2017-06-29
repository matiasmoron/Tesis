<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;
use Illuminate\Support\Facades\DB;

class Personal_Controller extends Controller
{
    public function get_personal($legajo=null){
        $params= array();
        $query='SELECT
                    CONCAT(apellido,", ",nombre) as nombre,
                    legajo
                FROM personal
                WHERE estado='.ALTA;

        if(isset($legajo)){
            $query.=' AND legajo=?';
            array_push($params,$legajo);
        }

        return $this->execute_simple_query("select",$query,$params);
    }

    public function add_personal(Request $request){
        /*$params= array();
        $query='INSERT INTO personal (legajo,dni,usuario,nombre,apellido,id_puesto,id_servicio,fecha_ingreso,estado)
                VALUES(?,?,?,?,?,?,?,?,?)';

        array_push($params,$request->legajo);
        array_push($params,$request->dni);
        array_push($params,$request->usuario);
        array_push($params,$request->nombre);
        array_push($params,$request->apellido);
        array_push($params,$request->id_puesto);
        array_push($params,$request->id_servicio);
        array_push($params,$request->fecha_ingreso);
        array_push($params,0);//estado


        $personal=DB::select($query,$params);


        return $personal;*/
        echo $request;

    }
}
