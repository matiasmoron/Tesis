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
                    u.email=?
                
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


        array_push($params,$request->email);
        array_push($params,$request->email);
        

        return $this->execute_simple_query("select",$query,$params);
	}

}