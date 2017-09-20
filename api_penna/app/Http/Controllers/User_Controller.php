<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\UserModel;


class User_Controller extends Controller{
    function __construct(){
       $this-> user = new UserModel();
    }

    public function cambiar_password(Request $request){
        $reglas=[
                    'password_anterior'  => 'required|max:20',
                    'password'           => 'required|max:20',
                    'repassword'         => 'required|max:20'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> user -> cambiar_password($request);
    }


    ///////////////////////
    //////VALIDACIONES/////
    /////////////////////// 

    //verifica que concuerde el password anterior con el del usuario
    private function validar_pass_anterior($usuario,$password) {

    }

    //Verifica si los dos password ingresados son iguales
    private function validar_password($password,$repassword){

    }

}
