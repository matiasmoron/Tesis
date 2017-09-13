<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
use App\Tecnico;
use App\Http\Models\TecnicoModel;


class Tecnico_Controller extends Controller{

    function __construct(){
       $this->tecnico = new TecnicoModel();
    }
    //obtiene los técnicos con su respectiva entidad (puede haber mas de una entidad asiganada a un técnico)
    public function get_tecnicos(Request $request){
        $reglas=[
                    'id_entidad' => 'numeric',
                    'legajo'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> tecnico -> get_tecnicos($request);
    }

    public function get_entidades_no_asignadas(Request $request){
        $reglas=[
                    'legajo'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);
        return $this-> tecnico -> get_entidades_no_asignadas($request);
    }

    /**
    *Obtiene los distintos técnicos
    *@param id_entidad entidad a la que pertenecen los tecnicos
    */
    public function get_tecnicos_entidad(Request $request){
        $reglas=[
                    'id_entidad'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);
        return $this-> tecnico -> get_tecnicos_entidad($request);
    }

    public function add_tecnico(Request $request){
        $reglas=[
                    'legajo'     => 'required|numeric',
                    'id_entidad' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);
        return $this-> tecnico -> add_tecnico($request);
    }

    public function remove_tecnico(Request $request){
        $reglas=[
                    'legajo'     => 'required|numeric',
                    'id_entidad' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);
        return $this-> tecnico -> remove_tecnico($request);
    }

}
