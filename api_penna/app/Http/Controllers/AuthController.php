<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
//use Illuminate\Support\Facades\DB;
use App\Http\Models\PermisoModel;
use App\Http\Models\PersonalModel;

class AuthController extends Controller
{
    function __construct(){
       $this-> permiso  = new PermisoModel();
       $this-> personal = new PersonalModel();
    }

    public function run(){
         DB::table('users')->insert([
             'name' =>'Raquel',
            'email' => 'a@a.com',
            'password' => bcrypt('1234'),
        ]);
    }

    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');
        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $token    = compact('token');
        
        //Obtiene los permisos del usuario
        $permisos = $this -> permiso -> get_permisos($request);

        //Obtiene los datos del usuario
        $datos_usuario = $this -> personal -> get_personal((object) array("usuario" => $request->email));
        $usuario_result = $datos_usuario['result'];
        $usuario = array("nombre" => $usuario_result[0]->nombre_apellido);


        // all good so return the token
        return array("success"=>TRUE,"msg"=>"","result"=>array("token" => $token['token'],"usuario" => $usuario, "permisos" =>$permisos['result']));
        //return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }



}
