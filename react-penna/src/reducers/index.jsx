import { combineReducers } from 'redux';

// Reducers
import servicioReducer from './servicios_reducer';
import puestoReducer from './puestos_reducer';
import tecnicoReducer from './tecnicos_reducer';
import entidadReducer from './entidades_reducer';
import equipoReducer from './equipos_reducer';
import prestacionReducer from './prestaciones_reducer';
import solicitudReducer from './solicitudes_reducer';
import personalReducer from './personal_reducer';
import ordenesReducer from './ordenes_reducer';
import autenticacionReducer from './autenticacion_reducer';
import errorServerReducer from './error_server_reducer';
import formsReducer from './forms_reducer';





// Combine Reducers
var reducers = combineReducers({
    servicioState     : servicioReducer,
    puestoState       : puestoReducer,
    tecnicoState      : tecnicoReducer,
    entidadState      : entidadReducer,
    equipoState       : equipoReducer,
    prestacionState   : prestacionReducer,
    solicitudState    : solicitudReducer,
    personalState     : personalReducer,
    ordenesState      : ordenesReducer,
    autenticacionState: autenticacionReducer,
    errorServerState  : errorServerReducer,
    formsState        : formsReducer
});

export default reducers;
