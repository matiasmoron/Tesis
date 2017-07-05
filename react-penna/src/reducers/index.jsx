import { combineReducers } from 'redux';

// Reducers
import servicioReducer from './servicios_reducer';
import puestoReducer from './puestos_reducer';
import tecnicoReducer from './tecnicos_reducer';
import entidadReducer from './entidades_reducer';
import equipoReducer from './equipos_reducer';



// Combine Reducers
var reducers = combineReducers({
    servicioState: servicioReducer,
    puestoState: puestoReducer,
    tecnicoState: tecnicoReducer,
    entidadState: entidadReducer,
    equipoState: equipoReducer,
});

export default reducers;
