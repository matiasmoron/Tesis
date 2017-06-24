<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entidad;
use Illuminate\Support\Facades\DB;

class Entidad_Controller extends Controller
{
    public function get_entidades($id_entidad=null){
        $params= array();
        $query='SELECT
                    id_entidad,nombre,tipo_entidad
                FROM entidad
                WHERE estado='.ALTA;

        if(isset($id_entidad)){
            $query.=' AND id_entidad=?';
            array_push($params,$id_entidad);
        }

        $entidades=DB::select($query,$params);


        return $entidades;
    }

    public function add_entidad(Request $request){
        $params= array();
        $query='INSERT INTO entidad (nombre,tipo_entidad,estado)
                VALUES(?,?,?)';

        array_push($params,$request->nombre);
        array_push($params,$request->tipo_entidad);
        array_push($params,ALTA);

        $agregar_entidad=DB::insert($query,$params);


        $entidad= "SELECT * FROM entidad where id_entidad=last_insert_id();";
        return DB::select($entidad);

    }

    public function update_entidad(Request $request){
        $params= array();
        $query='UPDATE entidad
        		SET    nombre=?
                WHERE  id_entidad=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_entidad);


        $update_entidad=DB::update($query,$params);

        return $update_entidad;

    }


    public function remove_entidad(Request $request){
        $params= array();
        $query='UPDATE entidad
        		SET    estado='.BAJA.'
                WHERE  id_entidad=?';

        array_push($params,$request->id_entidad);

        $delete_entidad=DB::update($query,$params);

        return $delete_entidad;

    }




}
