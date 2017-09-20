<?php
namespace App\Http\Models;
use App\Http\Models\Model;

class EquipoModel extends Model {

	public function get_equipos($request){
		$params= array();
        $query='SELECT
                    e.id_equipo id_bien,
                    e.id_tipo_equipo,
                    e.id_equipo_padre,
                    e.cod_patrimonial,
                    CONCAT(e.cod_patrimonial," - ",e.descripcion) cod_desc,
                    e.descripcion,
                    s.id_servicio,
                    s.nombre as servicio_nombre,
                	if(e.id_equipo_padre is not null,e_padre.descripcion,"-") as padre_desc,
                	if(e.id_equipo_padre is not null,e_padre.cod_patrimonial,"-") as padre_cod
                FROM  equipo e
                JOIN servicio s USING(id_servicio)
                LEFT JOIN equipo e_padre ON(e.id_equipo_padre=e_padre.id_equipo)
                WHERE e.estado='.ALTA;

        if(isset($request->id_bien)){
            $query.=' AND e.id_equipo=?';
            array_push($params,$request->id_bien);
        }
        if(isset($request->cod_patrimonial)){
            $query.=' AND e.cod_patrimonial=?';
            array_push($params,$request->cod_patrimonial);
        }
        if(isset($request->id_servicio)){
            $query.=' AND e.id_servicio=?';
            array_push($params,$request->id_servicio);
        }
        return $this->execute_simple_query("select",$query,$params);
	}

	public function add_equipo($request){
        $params=array();
        $query=array();

        $query='INSERT INTO equipo (id_tipo_equipo,id_equipo_padre,cod_patrimonial,id_servicio,descripcion,estado)
                VALUES(?,?,?,?,?,'.ALTA.')';

        array_push($params,$request->id_tipo_equipo);
        array_push($params,$request->id_equipo_padre);
        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->id_servicio);
        array_push($params,$request->descripcion);

        return $this->execute_simple_query("insert",$query,$params);
    }

    public function remove_equipo($request){
        $params= array();
        $query='UPDATE equipo
        		    SET    estado='.BAJA.'
                WHERE  id_equipo=?';

        array_push($params,$request->id_bien);

        return $this->execute_simple_query("update",$query,$params);
    }

    public function update_equipo($request){
        $params= array();
        $query='UPDATE equipo
                SET
                       cod_patrimonial=?,
                       descripcion=?
                WHERE  id_equipo=?';

        array_push($params,$request->cod_patrimonial);
        array_push($params,$request->descripcion);;
        array_push($params,$request->id_bien);

        return $this->execute_simple_query("update",$query,$params);
    }
}