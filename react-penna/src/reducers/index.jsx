import { combineReducers } from 'redux';

// Reducers
import servicioReducer from './servicios_reducer';


// Combine Reducers
var reducers = combineReducers({
    servicioState: servicioReducer
});

export default reducers;
