<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;

class Personal_Controller extends Controller
{
    public function get_personal(Request $request){
        $params= array();
        $query='SELECT
                    CONCAT(p.apellido,", ",p.nombre) as nombre_apellido,
                    p.nombre,
                    p.apellido,
                    p.legajo,
                    p.usuario,
                    p.dni,
                    DATE_FORMAT(p.fecha_ingreso,"%d/%m/%Y") as fecha_ingreso,
                    p.id_puesto,
                    p.id_servicio,
                    s.nombre as servicio_nombre,
                    puesto.nombre as puesto_nombre
                FROM personal p
                LEFT JOIN
                    servicio s USING(id_servicio)
                LEFT JOIN
                    puesto puesto USING(id_puesto)
                WHERE estado='.ALTA;

        if(isset($request->legajo)){
            $query.=' AND p.legajo=?';
            array_push($params,$request->legajo);
        }


        return $this->execute_simple_query("select",$query,$params);
    }

    public function add_personal(Request $request){
        $metodo=array();
        $array_params= array();
        $params=array();
        $query=array();

        //Primera consulta
        array_push($metodo, "insert");
        $query[0]='INSERT INTO personal (legajo,dni,usuario,nombre,apellido,id_puesto,id_servicio,fecha_ingreso,estado)
                VALUES(?,?,?,?,?,?,?,?,'.ALTA.')';

        array_push($params,$request->legajo);
        array_push($params,$request->dni);
        array_push($params,$request->usuario);
        array_push($params,$request->nombre);
        array_push($params,$request->apellido);
        array_push($params,$request->id_puesto);
        array_push($params,$request->id_servicio);
        array_push($params,$request->fecha_ingreso);
        array_push($array_params,$params);

        //Segunda consulta
        array_push($metodo, "select");
        $query[1]= "SELECT
                        p.*,
                        s.nombre as servicio_nombre,
                        puesto.nombre as puesto_nombre
                    FROM personal  p
                    JOIN servicio s USING(id_servicio)
                    JOIN puesto puesto USING (id_puesto)
                    WHERE legajo=?";
        array_push($array_params,array($request->legajo));
        return $this->execute_multiple_query($metodo,$query,$array_params,true);
    }

    public function remove_personal(Request $request){
        $params= array();
        $query='UPDATE personal
                    SET    estado='.BAJA.'
                WHERE  legajo=?';

        array_push($params,$request->legajo);

        return $this->execute_simple_query("update",$query,$params);

    }

    public function update_personal(Request $request){
        $params= array();
        $query='UPDATE personal
                SET    dni=?,
                       usuario=?,
                       nombre=?,
                       apellido=?,
                       fecha_ingreso=?
                WHERE  legajo=?';

        array_push($params,$request->dni);
        array_push($params,$request->usuario);
        array_push($params,$request->nombre);
        array_push($params,$request->apellido);
        array_push($params,$request->fecha_ingreso);
        array_push($params,$request->legajo);


        return $this->execute_simple_query("update",$query,$params);
    }
}
