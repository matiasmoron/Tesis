<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;

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
