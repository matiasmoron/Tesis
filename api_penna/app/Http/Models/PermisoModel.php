<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class PermisoModel extends Model {

	
    /**
    * Obtiene los permisos que tiene habilitados un usuario
    * @param legajo  
    */
    public function get_permisos($request){
		$params= array();
        $query='SELECT
                    p.id_opcion,p.id_menu
                FROM  
                    users u
                JOIN
                    permiso_perfil p USING(id_perfil)
                WHERE 
                    u.usuario=?
                
                UNION 

                SELECT
                    p.id_opcion,p.id_menu
                FROM
                    personal personal
                JOIN 
                    permiso_perfil p USING(legajo) 
                WHERE
                    personal.usuario = ?
                ;';


        array_push($params,$request->usuario);
        array_push($params,$request->usuario);
        

        return $this->execute_simple_query("select",$query,$params);
	}

    //Agrega una cuenta personal con el personal ingresado
    public function agregar_personal($request){
        $params= array();

        $query= 'INSERT INTO users(usuario,id_perfil,password)
                    VALUES  (?,?,?)';

        array_push($params,$request->usuario);
        array_push($params,4);
        array_push($params,bcrypt('1234'));

        return $this->execute_simple_query("insert",$query,$params);
    }

    //Le agrega el perfil tecnico a la cuenta del personal
    public function agregar_tecnico($request){
        $params= array();

        $query= 'UPDATE 
                    users u
                 INNER JOIN
                    personal p USING(usuario)
                SET
                    u.id_perfil=3
                WHERE
                    p.legajo=?

                    ';

        array_push($params,$request->legajo);

        return $this->execute_simple_query("update",$query,$params);
    }

    public function quitar_tecnico($request){
        $params= array();

        $query= 'UPDATE 
                    users u
                 INNER JOIN
                    personal p USING(usuario)
                SET
                    u.id_perfil=4
                WHERE
                    p.legajo=?

                    ';

        array_push($params,$request->legajo);

        return $this->execute_simple_query("update",$query,$params);
    }

    //Borra la cuenta de un personal
    public function quitar_personal($request){
        $params= array();

        $query='DELETE
                    users
                FROM
                    users
                JOIN
                    personal USING (usuario)
                WHERE
                    legajo=?';

        array_push($params,$request->legajo);

        return $this->execute_simple_query("delete",$query,$params);
    }

    //Verifica que la contraseña sea igual a la almacenada 
    public function validar_pass_anterior($usuario,$password){
        $query="SELECT 
                    1
                FROM
                    users
                WHERE
                    password=?
                    AND 
                    usuario=?";

        array_push($params,bcrypt($password));
        array_push($params,$usuario);

       $validacion =$this->execute_simple_query("select",$query,$params);

       if ($validacion['success'] && (count($validacion['result'])>0))
            return true;
        else
            return false;
    }

    
    public function cambiar_password($usuario,$request){
        $query="UPDATE
                    users
                SET
                    password=?
                WHERE
                    usuario=?";

        array_push($params,bcrypt($password));
        array_push($params,$request->usuario);

        return $this->execute_simple_query("update",$query,$params);
    }

}