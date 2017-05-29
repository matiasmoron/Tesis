import { combineReducers } from 'redux';

// Reducers
import servicioReducer from './servicios_reducer';
import puestoReducer from './puestos_reducer';



// Combine Reducers
var reducers = combineReducers({
    servicioState: servicioReducer,
    puestoState: puestoReducer
});

export default reducers;
