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

    public function get_entidades_no_asignadas(Request $request){
        $entidades=DB::raw('SELECT 
                                e.id_entidad, e.nombre 
                            FROM 
                                entidad e 
                            WHERE 
                                e.estado=1
                                AND
                                e.id_entidad not in (
                                        SELECT 
                                            t.id_entidad 
                                        FROM 
                                            tecnico t
                                        WHERE
                                            t.legajo='+$request->legajo+')'
                        );

        return $entidades;
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
