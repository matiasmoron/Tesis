<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;

class Servicio_Controller extends Controller
{
    public function get_servicios(){
        echo Servicio::all();
    }

    public function add_servicios(Request $request){
    	$servicio = new Servicio;
    	$servicio->nombre=$request->nombre;
    	 $servicio->save();
    }
}
