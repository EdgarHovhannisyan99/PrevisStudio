import { combineReducers } from 'redux';
import templates from './templates'
import storeImage from './imgReducer'

export default combineReducers({
    templates,
    storeImage
});
