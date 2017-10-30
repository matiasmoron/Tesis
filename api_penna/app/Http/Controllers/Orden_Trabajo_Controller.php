<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Orden_trabajo;
use App\Http\Models\OrdenTrabajoModel;

const EQUIPO=1;
const PRESTACION=2;
class Orden_Trabajo_Controller extends Controller{

    function __construct(){
       $this->OrdenTrabajo = new OrdenTrabajoModel();
    }


    /**
    *Obtiene los bienes con los detalles de las ordenes de trabajo que esta involucrado
    */
    public function get_bienes_solicitud(Request $request){
        switch ($request->id_tipo_bien) {
            case EQUIPO:
                return $this->get_equipos_solicitud($request);
                break;

            /*case PRESTACION:
                return Equipo_Controller::get_equipos($request);
                break;*/
        }
    }

    private function get_equipos_solicitud(Request $request){
        $reglas=[
                    'id_entidad'      => 'numeric',
                    'cod_patrimonial' => 'numeric',
                    'id_servicio'     => 'numeric'
                ];

        $this->validar($request->all(),$reglas);

        return $this-> OrdenTrabajo -> get_equipos_solicitud($request);
    }

    //Obtiene las ordenes de trabajo segun los filtros ingresados
    public function get_ordenes(Request $request){
        switch ($request->id_tipo_bien) {
            case EQUIPO:
                return $this->get_ordenes_equipo($request);
                break;

            /*case PRESTACION:
                return Equipo_Controller::get_equipos($request);
                break;*/
        }
    }

    /**
     * Obtiene las ordenes de trabajo con sus detalles
     * @param  filtros de la consulta  $request array(
     *                                     id_bien = id del equipo
     *                                     cod_patrimonial= cod del equipo
     *                                     id_servicio = id del Servicio
     *                                     leg_recepcion= legajo del tecnico que toma la orden de trabajo
     *                                     estado= el id_estado de la orden del trabajo
     *                                     fecha_ini = fecha de creacion desde donde se solicitan las ordenes de trabajo
     *                                     fecha_fin= fecha de creación hasta donde se solicitan las ordenes de trabajo
     *                             )
     * @return {[type]
     */
    private function get_ordenes_equipo($request){
        $reglas=[
                    'id_bien'         => 'numeric',
                    'cod_patrimonial' => 'numeric',
                    'id_servicio'     => 'numeric',
                    'id_entidad'      => 'numeric',
                    'leg_recepcion'   => 'numeric',
                    'fecha_ini'       => 'date_format:"d/m/Y"',
                    'fecha_fin'       => 'date_format:"d/m/Y"'
                ];

        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->get_ordenes_equipo($request);
    }

    public function add_orden(Request $request){
        $reglas=[
                    'id_tipo_bien'    => 'numeric',
                    'id_bien'         => 'numeric',
                    'tipo_entidad'    => 'numeric',
                    'entidad_destino' => 'numeric',
                    'obs_creacion'    => 'max:45'

                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->add_orden($request);
    }

    /**
     * Obtiene los datos de la orden de trabajo
     * @param  $request => id_orden_trabajo
     */
    public function get_orden_trabajo(Request $request){
        $reglas=[
                    'id_orden_trabajo' => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);
        return $this -> OrdenTrabajo ->get_orden_trabajo($request);
    }

    /**
     * Modifica la conformidad de una orden de trabajo
     * @param $request array(
     *                     id_orden_trabajo: id de la orden de trabajo
     *                     conformidad     : int con la conformidad del trabajo
     *                     )
     */
    public function dar_conformidad(Request $request){
        $reglas=[
                    'conformidad'      => 'required|numeric',
                    'id_orden_trabajo' => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->dar_conformidad($request);
    }

    /**
     * Asigna a la orden de trabajo a una nueva entidad
     * @param $request array(
     *                     id_orden_trabajo : id de la orden de trabajo
     *                     entidad_destino  : id de la entidad a la que se deriva la orden de trabajo
     *                     )
     */
    public function derivar_orden(Request $request) {
        $reglas=[
                    'entidad_destino'  => 'required|numeric',
                    'id_orden_trabajo' => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->derivar_orden($request);
    }

    /**
     * Asigna a la orden de trabajo a una persona para que la realice
     * @param $request array(
     *                     id_orden_trabajo : id de la orden de trabajo
     *                     leg_recepcion    : legajo de un técnico que va a tomar la orden de trabajo
     *                     )
     */
    public function asignar_orden(Request $request) {
        $reglas=[
                    'id_orden_trabajo' => 'required|numeric',
                    'leg_recepcion'    => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->asignar_orden($request);
    }

    public function actualizar_orden(Request $request){
        $reglas=[
                    'obs_devolucion'   => 'required|max:45',
                    'id_orden_trabajo' => 'required|numeric',
                    'hs_insumidas'     => 'numeric',
                    'prioridad'        => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->actualizar_orden($request);
    }

    /**
    *Actualiza el estado de una orden de trabajo
    *@param estado el estado a actualizar
    *@param id_orden_trabajo
    */
    public function actualizar_estado(Request $request){
        $reglas=[
                    'id_orden_trabajo' => 'required|numeric',
                    'estado'           => 'required|numeric'
                ];
        $this->validar($request->all(),$reglas);

        return $this -> OrdenTrabajo ->actualizar_orden($request);
    }

}
