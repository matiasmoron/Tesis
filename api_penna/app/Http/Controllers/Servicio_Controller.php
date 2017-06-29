<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;
use Illuminate\Support\Facades\DB;

class Servicio_Controller extends Controller
{
    public function get_servicios(){
        $query= "SELECT id_servicio,nombre
                 FROM servicio;";
       
       return $this->execute_simple_query("select",$query);
    }

    public function add_servicio(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]="INSERT INTO servicio(nombre) VALUES(?);";
        array_push($params,$request->nombre);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT * FROM servicio where id_servicio=last_insert_id();";
        array_push($array_params,array());

        return $this->execute_multiple_query($metodo,$query,$array_params,true);

    }

    public function remove_servicio(Request $request){
        $params= array();
        
        $query='DELETE 
                FROM   servicio
                WHERE  id_servicio=?';

        array_push($params,$request->id_servicio);


        return $this->execute_simple_query("delete",$query,$params);
    }

    public function update_servicio(Request $request){
        $params= array();
        $query='UPDATE servicio
                SET    nombre=?
                WHERE  id_servicio=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_servicio);


        return $this->execute_simple_query("update",$query,$params);

    }

    

}
