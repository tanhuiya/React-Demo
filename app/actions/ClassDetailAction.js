import * as types from './actionType';
import Util from '../common/util';

export let ClassDetailAction = (tag,offset,limit,isLoadMore,isRefreshing,isLoading)=>{
  let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
    if (limit) URL += limit;
    offset ? URL += '&max=' + offset : URL += '&max=';
    tag ? URL += '&tag=' + encodeURIComponent(tag) : URL += '&tag='

  return dispatch=>{
    dispatch(fetch_detail_list(isLoadMore,isRefreshing,isLoading));
    return Util.get(URL,(response)=>{
      dispatch(receive_detail_list(response.pins));
    },
    (error)=>{
      dispatch(receive_detail_list([]));
    });
  }


}

let fetch_detail_list = (isLoadMore,isRefreshing,isLoading)=>{
  return {
    type : types.FETCH_CLASS_DETAIL_LIST,
    isLoading : isLoading,
    isRefreshing : isRefreshing,
    isLoadMore : isLoadMore,
  }
}
let receive_detail_list = (ClassDetailData)=>{
  return {
    type : types.RECEIVE_CLASS_DETAIL_LIST,
    ClassDetailData : ClassDetailData,
  }
}
export let reset_detail_list = ()=>{
  return {
    type : types.RESET_DETAIL_LIST,

  }
}
