import isLogged from './isLogged';
import notifications from './notifications';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: isLogged,
    notifications: notifications,

});
export default allReducers;