<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class TecnicoModel extends Model {

    //obtiene los técnicos con su respectiva entidad (puede haber mas de una entidad asiganada a un técnico)
    public function get_tecnicos($request){
        $params = array();
        $query='SELECT
                    tecnico.legajo,
                    CONCAT (personal.apellido,", ",personal.nombre) as nombre_apellido,
                    personal.dni,
                    entidad.nombre as entidad,
                    entidad.id_entidad,
                    CONCAT(tecnico.legajo,",",entidad.id_entidad) as tecnico_key
                FROM
                    personal
                INNER JOIN
                    tecnico USING (legajo)
                INNER JOIN
                    entidad USING (id_entidad)
                WHERE
                    personal.estado='.ALTA;


        if(isset($request->id_entidad)){
            $query.=' AND tecnico.id_entidad=?';
            array_push($params,$request->id_entidad);
        }

        if(isset($request->legajo)){
            $query.=' AND tecnico.legajo=?';
            array_push($params,$request->legajo);
        }


        return $this->execute_simple_query("select",$query,$params);
    }

    //Devuelve true si el personal es un tecnico y false en caso contrario    
    public function es_tecnico($request){
        $params = array();
        $query='SELECT 
                    1
                FROM
                    tecnico
                WHERE
                    legajo=?
                ';

        array_push($params,$request->legajo);

        $existe= $this->execute_simple_query("select",$query,$params);

        if ($existe['success'] && (count($existe['result'])>0))
            return true;
        else
            return false;

    }

    public function get_entidades_no_asignadas($request){
        $params = array();
        array_push($params,$request-> legajo);
        $query="SELECT
                    e.id_entidad,
                    e.nombre
                FROM entidad e
                WHERE e.estado=1
                AND e.id_entidad not in (
                                            SELECT t.id_entidad
                                            FROM tecnico t
                                            WHERE t.legajo=?
                                        )";

        return $this->execute_simple_query("select",$query,$params);
    }

    /**
    *Obtiene los distintos técnicos
    *@param id_entidad entidad a la que pertenecen los tecnicos
    */
    public function get_tecnicos_entidad($request){
        $params = array();

        $query="SELECT
                    distinct t.legajo,CONCAT(p.apellido,' ',p.nombre) as nombre_apellido
                FROM
                    tecnico t
                INNER JOIN
                    personal p
                    USING(legajo)
                WHERE
                    p.estado=".ALTA;

        if(isset($request->id_entidad)){
            $query.=' AND t.id_entidad=?';
            array_push($params,$request->id_entidad);
        }

        return $this->execute_simple_query("select",$query,$params);
    }

    public function add_tecnico($request){
        $params=array();
        $query=array();

        $query='INSERT INTO tecnico (legajo,id_entidad)
                VALUES(?,?)';

        array_push($params,$request->legajo);
        array_push($params,$request->id_entidad);


        return $this->execute_simple_query("insert",$query,$params);
    }

    public function remove_tecnico($request){
        $params= array();
        $query='DELETE
                FROM   tecnico
                WHERE  legajo=?
                       AND id_entidad=?';

        array_push($params,$request->legajo);
        array_push($params,$request->id_entidad);


        return $this->execute_simple_query("delete",$query,$params);
    }

}
