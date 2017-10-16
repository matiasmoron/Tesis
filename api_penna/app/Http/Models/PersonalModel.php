<?php
namespace App\Http\Models;
use App\Http\Models\Model;
use App\Http\Models\PermisoModel;
use Illuminate\Support\Facades\DB;

class PersonalModel extends Model {

    function __construct(){ 
        parent::__construct();
       $this->permiso= new PermisoModel();
    } 

	public function get_personal($request){
        $params= array();
         $query='SELECT
                    CONCAT(p.apellido,", ",p.nombre) as nombre_apellido,
                    p.nombre,
                    p.apellido,
                    p.legajo,
                    p.usuario,
                    p.dni,
                    DATE_FORMAT(p.fecha_ingreso,"%d/%m/%Y") as fecha_ingreso,
                    p.id_servicio,
                    s.nombre as servicio_nombre
                FROM personal p
                LEFT JOIN
                    servicio s USING(id_servicio)
                WHERE estado='.ALTA;
 
         if(isset($request->legajo)){
             $query.=' AND p.legajo=?';
             array_push($params,$request->legajo);
         }

         if(isset($request->usuario)){
             $query.=' AND p.usuario=?';
             array_push($params,$request->usuario);
         }
 
 
         return $this->execute_simple_query("select",$query,$params);
	}

    
    /**
    *Se fija si existe el personal pero dado de baja
    * @return true si existe y false caso contrario
    */
    public function existe_personal_baja($request){
        $params= array();
        $query='SELECT
                    1
                FROM
                    personal
                WHERE
                    legajo=?
                    AND
                    estado='.BAJA.'

                ;';

        array_push($params,$request->legajo);

        $existe=$this->execute_simple_query("select",$query,$params);

        if ($existe['success'] && (count($existe['result'])>0))
            return true;
        else
            return false;
    }

	public function add_personal($request){
		try{
            DB::beginTransaction();
            $params=array();

            $query='INSERT INTO personal 
            				(legajo,dni,usuario,nombre,apellido,id_servicio,fecha_ingreso,estado)
                    VALUES
                    		(?,?,?,?,?,?,str_to_date(?,"%d/%m/%Y"),'.ALTA.')';

            array_push($params,$request->legajo);
            array_push($params,$request->dni);
            array_push($params,$request->usuario);
            array_push($params,$request->nombre);
            array_push($params,$request->apellido);
            array_push($params,$request->id_servicio);
            array_push($params,$request->fecha_ingreso);

            $resultado= $this->execute_simple_query('insert',$query,$params);

            //Le agrego la cuenta al personal dado de alta    
            $this->permiso->agregar_personal($request);

            DB::commit();
            return array("success"=>TRUE,"msg"=>"","result"=>$resultado);
        }
        catch (\Exception $e) {
            DB::rollback();
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }

	}


    //Da de alta un personal creando nuevamente la cuenta
    public function dar_alta($request){
        try{
            DB::beginTransaction();

            $request->estado=ALTA;
            $this->update_personal($request);
            $this->permiso->agregar_personal($request);

            DB::commit();

            return array("success"=>TRUE,"msg"=>"","result"=>TRUE);
        }
        catch (\Exception $e) {
            DB::rollback();
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }

    }

	//Da de baja a un personal quitandolo de users
    public function remove_personal($request){
		try{
            DB::beginTransaction();

            $params= array();

            $query='UPDATE personal
                    SET    estado='.BAJA.'
                    WHERE  legajo=?';

            array_push($params,$request->legajo);

            
            $resultado=$this->execute_simple_query("update",$query,$params);

            //Le saco la cuenta al personal dado de baja    
            $this->permiso->quitar_personal($request);

            DB::commit();

            return array("success"=>TRUE,"msg"=>"","result"=>$resultado);

        }
        catch (\Exception $e) {
            DB::rollback();
            die(json_encode(array("success"=>FALSE,"msg"=> $e->getMessage(),"result"=>FALSE)));
        }
	}

	public function update_personal($request){
		$params= array();
        $set="";

        if(isset($request->estado)){
             $set.=' estado=?, ';
             array_push($params,$request->estado);
         }

        $query='UPDATE personal
                SET    '.$set.'
                       dni=?,
                       usuario=?,
                       nombre=?,
                       apellido=?,
                       fecha_ingreso=str_to_date(?,"%d/%m/%Y")
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