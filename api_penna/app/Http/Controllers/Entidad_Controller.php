<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entidad;

class Entidad_Controller extends Controller
{
    public function get_entidades(Request $request){
        if (isset($request->id_entidad)){
            $entidad= Entidad::find($request->id_entidad);
            return $entidad;
        }
        else{
            echo Entidad::all();
        }
    }
}
