<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tecnico;

class Tecnico_Controller extends Controller
{
    public function get_tecnicos(){
        //echo Tecnico::all();
        $tecnico = DB::table('personal')
                    ->leftJoin('tecnico','tecnico.legajo','=','personal.legajo')
                    ->leftJoin('entidad','tecnico.id_entidad','=','entidad.id_entidad')
                    ->select('tecnico.legajo', 'personal.nombre','dni','entidad.nombre as entidad','entidad.id_entidad')
                    ->get();

        return $tecnico;
    }

    public function get_tecnico_personal(Request $request){
        $tecnico = DB::table('personal')
                    ->join('tecnico','tecnico.legajo','=','personal.legajo')
                    ->join('entidad','tecnico.id_entidad','=','entidad.id_entidad')
                    ->select('tecnico.legajo', 'personal.nombre','dni','entidad.nombre as entidad','entidad.id_entidad')
                    ->where('personal.legajo', $request->legajo)
                    ->get();

        return $tecnico;
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
