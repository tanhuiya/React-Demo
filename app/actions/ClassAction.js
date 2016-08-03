import * as types from './actionType';
import Util from '../common/util';

export let ClassAction = (isLoading)=>{
  let URL = "http://api.huaban.com/fm/wallpaper/tags";
  return dispatch=>{
    dispatch(fetch_class_list(isLoading));
    return Util.get(URL,
    (response)=>{
      dispatch(receive_class_list(response));
    },
    (error)=>{
      dispatch(receive_class_list([]));
    });
  }
}

let fetch_class_list = (isLoading)=>{
  return {
    type : types.FETCH_CLASS_LIST,
    isLoading : isLoading,
  }
}

let receive_class_list = (classList)=>{
  return {
    type : types.RECEIVE_CLASS_LIST,
    classList : classList,
  }
}
