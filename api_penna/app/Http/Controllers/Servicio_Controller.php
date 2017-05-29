<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;

class Servicio_Controller extends Controller
{
    public function get_servicios(){
        echo Servicio::all();
    }

    public function add_servicio(Request $request){
    	$servicio = new Servicio;
    	$servicio->nombre=$request->nombre;
    	echo $servicio->save();
    }

    public function remove_servicio(Request $request){
    	$servicio= Servicio::find($request->id_servicio);
    	echo $servicio->delete();
    }

    public function update_servicio(Request $request){
    	$servicio= Servicio::find($request->id_servicio);
    	$servicio->nombre = $request->nombre;
    	echo $servicio->save();
    }

    

}
