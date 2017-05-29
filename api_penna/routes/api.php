<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Servicios
Route::middleware('cors')->get('/servicios', 'Servicio_Controller@get_servicios');
Route::middleware('cors')->post('/servicios', 'Servicio_Controller@add_servicio');
Route::middleware('cors')->update('/servicios', 'Servicio_Controller@update_servicio');
Route::middleware('cors')->delete('/servicios', 'Servicio_Controller@remove_servicio');

//Puestos
Route::middleware('cors')->get('/puestos', 'Puesto_Controller@get_puestos');
Route::middleware('cors')->post('/puestos', 'Puesto_Controller@add_puesto');
Route::middleware('cors')->update('/puestos', 'Puesto_Controller@update_puesto');
Route::middleware('cors')->delete('/puestos', 'Puesto_Controller@remove_puesto');