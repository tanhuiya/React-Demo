import {combineReducers} from 'redux';

import Home from './HomeReducer';
import Class from './ClassReducer';
import ClassDetail from './ClassDetailReducer';
export default rootReducer = combineReducers({
  Home,
  Class,
  ClassDetail,
});
