import { combineReducers } from 'redux';
import tamuReducer from './tamuReducer';

export default combineReducers({
    tamu: tamuReducer
})