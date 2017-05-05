<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;

class Servicio_Controller extends Controller
{
    public function get_servicios(){
        echo Servicio::all();
    }
}
