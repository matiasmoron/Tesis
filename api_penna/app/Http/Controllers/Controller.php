<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;
use Illuminate\Support\Facades\DB;

const ALTA=1;
const BAJA=0;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function validar($datos,$reglas){
    	$mensajes = [
		    'required'    => ':attribute es necesario ingresarlo.',
		    'max'         => ':attribute debe ser menor a :max.',
		    'numeric'     => ':attribute debe ser un número.',
            'date_format' => ':attribute debe ser con el formato dd/mm/yyyy.'
		];

    	$validator = Validator::make($datos,$reglas,$mensajes);

        if ($validator->fails()) {
            die(json_encode(array("success"=>FALSE,"msg"=> $validator->errors()->first(),"result"=>FALSE)));
        }
    }

    protected function execute_simple_query($metodo,$query,$params=array()){
        try{
            $resultado;
            switch ($metodo) {
                case "select":
                    $resultado=DB::select($query,$params);
                    break;
                case "insert":
                    $resultado=DB::insert($query,$params);
                    break;
                case "update":
                    $resultado=DB::update($query,$params);
                    break;
                case "delete":
                    $resultado=DB::delete($query,$params);
                    break;
            }

            return array("success"=>TRUE,"msg"=>"","result"=>$resultado);

        }
        catch (\Exception $e) {
            /*header('HTTP/1.1 422 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE,'code' => 1337)));*/
            //return array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE);
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }
    }

    /**
    * Ejecuta multiples consultas devolviendo el resultado de la última
    *@param $metodo array que contiene tipo de la consulta (select,insert,update,delete)
    *@param $query  array donde cada elemento es una consulta
    *@param $params array donde cada elemento son los parámetro de una consulta
    *@param $transaccion true si las consultas son transaccionales y false en caso contrario
    */
    protected function execute_multiple_query($metodo,$query,$params=array(),$transaccion=true){
        try{
            if ($transaccion){
                DB::beginTransaction();
            }
            $resultado;
            foreach ($query as  $index => $consulta) {
                switch ($metodo[$index]) {
                case "select":
                    $resultado=DB::select($consulta,$params[$index]);
                    break;
                case "insert":
                    $resultado=DB::insert($consulta,$params[$index]);
                    break;
                case "update":
                    $resultado=DB::update($consulta,$params[$index]);
                    break;
                case "delete":
                    $resultado=DB::delete($consultas,$params[$index]);
                    break;
                }
            }

            if ($transaccion){
                DB::commit();
            }

            return array("success"=>TRUE,"msg"=>"","result"=>$resultado);
        }
        catch (\Exception $e) {
            /*header('HTTP/1.1 422 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array("success"=>FALSE,"msg"=>$e->getMessage(),"result"=>FALSE,'code' => 1337)));*/

            if ($transaccion){
                DB::rollback();
            }
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }
    }


    // protected function get_values_params($values){
    //     $signos=array();
    //     $valores=array();
    //     $result=array();
    //     foreach ($values as $key => $value) {
    //         array_push($signos,"?");
    //         array_push($valores,$value);
    //     }
    //     array_push($result,implode(",",$signos));
    //     array_push($result,implode(",",$valores));

    //     return $result;
    // }

}
