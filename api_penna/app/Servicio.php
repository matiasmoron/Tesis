<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
	protected $table = 'servicio';//Para definir al nombre de la tabla que hace referencia
    protected $primaryKey = 'id_servicio'; //Seteo la clave primaria
    // public $incrementing=false;//laravel asume que es autoincrement por eso lo deshabilito
    public $timestamps = false; //Asume que tiene las created_at y updated_at por eso lo deshabilito

}
