<?php
namespace App\Http\Models;

use App\Http\Models\Model;
// include('Model.php');

class EntidadModel extends Model {


	public function get_entidades($id_entidad=null) {
		$params= array();
        $query='SELECT
                    id_entidad,nombre,tipo_entidad
                FROM entidad
                WHERE estado='.ALTA.' AND tipo_entidad=1';

        if(isset($id_entidad)){
            $query.=' AND id_entidad=?';
            array_push($params,$id_entidad);
        }

        return $this->execute_simple_query("select",$query,$params);
	}
}