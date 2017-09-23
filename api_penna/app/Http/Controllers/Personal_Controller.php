<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;
use App\Http\Models\PersonalModel;

class Personal_Controller extends Controller
{
    function __construct(){ 
       $this->personal= new PersonalModel(); 
    } 

    public function get_personal(Request $request){
        $reglas=[
                    'legajo' => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->get_personal($request);
    }

    public function add_personal(Request $request){
        $reglas=[
                    'legajo'        => 'numeric',
                    'dni'           => 'numeric',
                    'usuario'       => 'required|max:20',
                    'nombre'        => 'required|max:20',
                    'apellido'      => 'required|max:20',
                    'id_puesto'     => 'numeric',
                    'id_servicio'   => 'numeric',
                    'fecha_ingreso' => 'date_format:d/m/Y'
                ];

        $this->validar($request->all(),$reglas);


        return $this->personal->add_personal($request);
    }

    public function remove_personal(Request $request){
        $reglas=[
                    'legajo' => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->remove_personal($request);

    }

    public function update_personal(Request $request){
        $reglas=[
                    'legajo'        => 'numeric',
                    'dni'           => 'numeric',
                    'usuario'       => 'required|max:20',
                    'nombre'        => 'required|max:20',
                    'apellido'      => 'required|max:20',
                    'fecha_ingreso' => 'date_format:d/m/Y'
                ];

        $this->validar($request->all(),$reglas);

        return $this->personal->update_personal($request);
    }
}
