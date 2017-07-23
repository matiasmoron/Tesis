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
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Servicios
Route::middleware('cors')->get('/servicios', 'Servicio_Controller@get_servicios');
Route::middleware('cors')->post('/servicios', 'Servicio_Controller@add_servicio');
Route::middleware('cors')->put('/servicios', 'Servicio_Controller@update_servicio');
Route::middleware('cors')->delete('/servicios', 'Servicio_Controller@remove_servicio');	

//Puestos
Route::middleware('cors')->get('/puestos/{id_puesto?}', 'Puesto_Controller@get_puestos');
Route::middleware('cors')->post('/puestos', 'Puesto_Controller@add_puesto');
Route::middleware('cors')->put('/puestos', 'Puesto_Controller@update_puesto');
Route::middleware('cors')->delete('/puestos', 'Puesto_Controller@remove_puesto');

//Técnicos
Route::middleware('cors')->get('/tecnicos', 'Tecnico_Controller@get_tecnicos');
Route::middleware('cors')->post('/tecnicos', 'Tecnico_Controller@add_tecnico');
Route::middleware('cors')->delete('/tecnicos', 'Tecnico_Controller@remove_tecnico');
Route::middleware('cors')->post('/tecnico_entidad', 'Tecnico_Controller@get_entidades_no_asignadas');

//Personal
Route::middleware('cors')->get('/personal/{legajo?}', 'Personal_Controller@get_personal');
Route::middleware('cors')->post('/personal', 'Personal_Controller@add_personal');
Route::middleware('cors')->put('/personal', 'Personal_Controller@update_personal');
Route::middleware('cors')->delete('/personal', 'Personal_Controller@remove_personal');

//Entidad
Route::middleware('cors')->get('/entidades/{id_entidad?}', 'Entidad_Controller@get_entidades');
Route::middleware('cors')->post('/entidades', 'Entidad_Controller@add_entidad');
Route::middleware('cors')->put('/entidades', 'Entidad_Controller@update_entidad');
Route::middleware('cors')->delete('/entidades', 'Entidad_Controller@remove_entidad');

//Equipo
Route::middleware('cors')->get('/equipos/{id_equipo?}', 'Equipo_Controller@get_equipos');
Route::middleware('cors')->post('/equipos', 'Equipo_Controller@add_equipo');
Route::middleware('cors')->put('/equipos', 'Equipo_Controller@update_equipo');
Route::middleware('cors')->delete('/equipos', 'Equipo_Controller@remove_equipo');

//Solicitud
Route::middleware('cors')->get('/solicitudes/{id_solicitud?}', 'Solicitud_Controller@get_solicitudes');
Route::middleware('cors')->post('/solicitudes', 'Solicitud_Controller@add_solicitud');
Route::middleware('cors')->put('/solicitudes', 'Solicitud_Controller@update_solicitud');
Route::middleware('cors')->delete('/solicitudes', 'Solicitud_Controller@remove_solicitud');