<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entidad;
use App\Http\Models\EntidadModel;


class Entidad_Controller extends Controller
{

    //Obtiene todas las entidades internas
    /*public function get_entidades(Request $request){
        $params= array();
        $query='SELECT
                    id_entidad,nombre,tipo_entidad
                FROM entidad
                WHERE estado='.ALTA.' AND tipo_entidad=1';

        if(isset($request->id_entidad)){
            $query.=' AND id_entidad=?';
            array_push($params,$request->id_entidad);
        }

        return $this->execute_simple_query("select",$query,$params);
    }*/


    function __construct(){ 
       $this->entidad= new EntidadModel(); 
    } 

    public function get_entidades(Request $request){
        // $entidad= new EntidadModel();
        return $this->entidad->get_entidades($request->id_entidad);
    }


    public function add_entidad(Request $request){
        $this->validarActualizar($request->all());
       
        $params=array();
        $query=array();

        $query='INSERT INTO entidad (nombre,tipo_entidad,estado)
                VALUES(?,?,?)';

        array_push($params,$request->nombre);
        array_push($params,$request->tipo_entidad);
        array_push($params,ALTA);


        return $this->execute_simple_query("insert",$query,$params);
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
