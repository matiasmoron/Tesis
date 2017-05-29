<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Puesto;

class Puesto_Controller extends Controller
{
    public function get_puestos(){
        echo Puesto::all();
    }

    public function add_puesto(Request $request){
    	$puesto = new Puesto;
    	$puesto->nombre=$request->nombre;
    	echo $puesto->save();
    }

    public function remove_puesto(Request $request){
    	$puesto= Puesto::find($request->id_puesto);
    	echo $puesto->delete();
    }

    public function update_puesto(Request $request){
    	$puesto= Puesto::find($request->id_puesto);
    	$puesto->nombre = $request->nombre;
    	echo $puesto->save();
    }
}
