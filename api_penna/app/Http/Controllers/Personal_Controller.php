<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;

class Personal_Controller extends Controller
{
    public function get_personal(Request $request){
        if (isset($request->)){
            $personal= Personal::find($request->legajo);
            return $personal;
        }
        else{
            echo Personal::all();
        }
    }
}
