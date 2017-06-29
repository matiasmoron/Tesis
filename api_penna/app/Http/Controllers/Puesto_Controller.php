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

        return $this->execute_simple_query("select",$query,$params);

    }


    public function add_puesto(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO puesto (nombre)
                VALUES(?)';

        array_push($params,$request->nombre);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT * FROM puesto where id_puesto=last_insert_id();";
        array_push($array_params,array());
        
        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function update_puesto(Request $request){
        $params= array();
        $query='UPDATE puesto
                SET    nombre=?
                WHERE  id_puesto=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_puesto);

        return $this->execute_simple_query("update",$query,$params);
    }

    public function remove_puesto(Request $request){
        $params= array();
        $query='DELETE 
                FROM   puesto
                WHERE  id_puesto=?';

        array_push($params,$request->id_puesto);


        return $this->execute_simple_query("delete",$query,$params);
    }

}
