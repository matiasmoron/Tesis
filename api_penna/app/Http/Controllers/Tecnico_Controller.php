<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tecnico;

class Tecnico_Controller extends Controller
{
    public function get_tecnicos(){
        echo Tecnico::all();
    }

    public function add_tecnico(Request $request){
    	$tecnico = new Tecnico;
    	$tecnico->legajo=$request->legajo;
    	$tecnico->id_entidad=$request->id_entidad;
    	echo $tecnico->save();
    }

    public function remove_tecnico(Request $request){
    	$tecnico= Tecnico::find($request->legajo);
    	echo $tecnico->delete();
    }

    public function update_tecnico(Request $request){
    	$tecnico= Tecnico::find($request->legajo);
    	$tecnico->id_entidad = $request->id_entidad;
    	echo $tecnico->save();
    }
}
