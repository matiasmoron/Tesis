<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tecnico;

class Tecnico_Controller extends Controller
{
    public function get_tecnicos(Request $request){
        //echo Tecnico::all();
        $tecnico = DB::table('personal')
                    ->leftJoin('tecnico','tecnico.legajo','=','personal.legajo')
                    ->leftJoin('entidad','tecnico.id_entidad','=','entidad.id_entidad')
                    ->select('tecnico.legajo', 'personal.nombre','dni','entidad.nombre as entidad','entidad.id_entidad');

        if (isset($request->dni)){
            $tecnico= $tecnico->where('personal.dni', $request->dni);
        }

        $tecnico= $tecnico->get();
        return $tecnico;
    }

    /*public function get_tecnico_personal(Request $request){
        echo $request;
        $tecnico = DB::table('personal')
                    ->join('tecnico','tecnico.legajo','=','personal.legajo')
                    ->join('entidad','tecnico.id_entidad','=','entidad.id_entidad')
                    ->select('tecnico.legajo', 'personal.nombre','dni','entidad.nombre as entidad','entidad.id_entidad')
                    ->where('personal.dni', $request->dni)
                    ->get();

        return $tecnico;
    }*/

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
