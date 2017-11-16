<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;
use App\Http\Models\EquipoModel;


class Equipo_Controller extends Controller{
    function __construct(){
       $this-> equipo = new EquipoModel();
    }

    public function get_equipos(Request $request){
        $reglas=[
                    'id_bien'         => 'numeric',
                    'cod_patrimonial' => 'numeric',
                    'id_servicio'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo -> get_equipos($request);
    }

    public function add_equipo(Request $request){
        $reglas=[
                    'id_tipo_equipo'  => 'required|numeric',
                    'id_equipo_padre' => 'numeric',
                    'cod_patrimonial' => 'required|numeric',
                    'id_servicio'     => 'required|numeric',
                    'descripcion'     => 'required|max:45'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->add_equipo($request);
    }

    public function remove_equipo(Request $request){
        $reglas=[
                    'id_bien' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->remove_equipo($request);

    }

    public function update_equipo(Request $request){
        $reglas=[
                    'cod_patrimonial' => 'required|numeric',
                    'descripcion'     => 'required|max:45',
                    'id_bien'         => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->update_equipo($request);
    }

    public function get_padres(Request $request){
        $reglas=[
                    'id_bienes' => 'required'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->get_padres($request);
    }

    /**
    * Determina si ya existe el código patrimonial 
    */
    public function existe_cod_patrimonial(Request $request){
        $reglas=[
                    'cod_patrimonial' => 'required|numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> equipo ->existe_cod_patrimonial($request);
    }
}
