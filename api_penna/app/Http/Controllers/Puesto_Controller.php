<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Puesto;

class Puesto_Controller extends Controller
{
    public function get_puestos(){
        echo Puesto::all();
    }

    public function add_servicio(Request $request){
    	$puesto = new Puesto;
    	$puesto->nombre=$request->nombre;
    	echo $puesto->save();
    }

    public function remove_servicio(Request $request){
    	$puesto= Puesto::find($request->id_servicio);
    	echo $puesto->delete();
    }

    public function update_servicio(Request $request){
    	$puesto= Puesto::find($request->id_servicio);
    	$puesto->nombre = $request->nombre;
    	echo $puesto->save();
    }
}
