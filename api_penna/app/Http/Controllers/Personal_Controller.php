<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;

class Personal_Controller extends Controller
{
    public function get_personal(Request $request){
         $personal=DB::raw('SELECT 
                                CONCAT(apellido,", ",nombre) as nombre,legajo
                            FROM 
                                personal
                            WHERE 
                                estado=1
                                AND
                                legajo='+$request->legajo+''
                        );
    }
}
