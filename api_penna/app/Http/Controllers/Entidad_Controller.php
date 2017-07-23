<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entidad;


class Entidad_Controller extends Controller
{
    public function get_entidades(Request $request){
        $params= array();
        $query='SELECT
                    id_entidad,nombre,tipo_entidad
                FROM entidad
                WHERE estado='.ALTA;

        if(isset($request->id_entidad)){
            $query.=' AND id_entidad=?';
            array_push($params,$request->id_entidad);
        }

        return $this->execute_simple_query("select",$query,$params);
    }


    public function add_entidad(Request $request){
        $this->validarActualizar($request->all());
       
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO entidad (nombre,tipo_entidad,estado)
                VALUES(?,?,?)';

        array_push($params,$request->nombre);
        array_push($params,$request->tipo_entidad);
        array_push($params,ALTA);
        array_push($array_params,$params);


        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT * FROM entidad where id_entidad=last_insert_id()";
        array_push($array_params,array());


        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function update_entidad(Request $request){
        $this->validarIDEntidad($request->all());

        $params= array();
        $query='UPDATE entidad
        		SET    nombre=?
                WHERE  id_entidad=?';

        array_push($params,$request->nombre);
        array_push($params,$request->id_entidad);


        return $this->execute_simple_query("update",$query,$params);

    }


    public function remove_entidad(Request $request){
        $this->validarIDEntidad($request->all());

        $params= array();
        $query='UPDATE entidad
        		SET    estado='.BAJA.'
                WHERE  id_entidad=?';

        array_push($params,$request->id_entidad);

        return $this->execute_simple_query("update",$query,$params);

    }

    private function validarActualizar($datos){
        $reglas=[
            'nombre' => 'required|max:45',
            'tipo_entidad' => 'required|numeric',
            ];

        $this->validar($datos,$reglas);
    }

    private function validarIDEntidad($datos){
        $reglas=[
            'id_entidad' => 'required|numeric',
            ];

        $this->validar($datos,$reglas);
    }


}
