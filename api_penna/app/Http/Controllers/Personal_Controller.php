<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;
use Illuminate\Support\Facades\DB;

class Personal_Controller extends Controller
{
    public function get_personal(Request $request){
        $legajo = $request -> legajo;
        $params= array();
        $query='SELECT
                    CONCAT(apellido,", ",nombre) as nombre,
                    legajo
                FROM personal
                WHERE estado=1';

        if(isset($legajo)){
            $query.=' AND legajo=?';
            array_push($params,$legajo);
        }

        $personal=DB::select($query,$params);


        return $personal;
    }
}
