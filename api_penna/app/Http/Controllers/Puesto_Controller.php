<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Puesto;
use Illuminate\Support\Facades\DB;

class Puesto_Controller extends Controller
{
    
    public function get_puestos($id_puesto=null){
        $params= array();
        $query='SELECT
                    id_puesto,nombre
                FROM puesto';


        if(isset($id_puesto)){
            $query.=' AND id_puesto=?';
            array_push($params,$id_puesto);
        }

        $puestos=DB::select($query,$params);


        return $puestos;
    }


    public function add_puesto(Request $request){
        $params= array();
        $query='INSERT INTO puesto (nombre)
                VALUES(?)';

        array_push($params,$request->nombre);

        $agregar_puesto=DB::insert($query,$params);


        $puesto= "SELECT * FROM puesto where id_puesto=last_insert_id();";
        return DB::select($puesto);
    }

    public function update_puesto(Request $request){
        $params= array();
        $query='UPDATE puesto
                SET    nombre=?
                WHERE  id_puesto=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_puesto);


        $update_puesto=DB::update($query,$params);

        return $update_puesto;
    }

    public function remove_puesto(Request $request){
        $params= array();
        $query='DELETE 
                FROM   puesto
                WHERE  id_puesto=?';

        array_push($params,$request->id_puesto);


        $delete_puesto=DB::delete($query,$params);

        return $delete_puesto;

    }

}
