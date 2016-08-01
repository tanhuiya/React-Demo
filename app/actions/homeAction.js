import * as types from './actionType';
import Util from '../common/util';

export let home = (tag,offset,limit,isLoadMore,isRefreshing,isLoading)=>{
  let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
  if (limit) {
    URL += limit;
  }
  offset? URL += '&max='+offset : URL+= '&max=';
  tag? URL += '&tag='+encodeURIComponent(tag) : URL += '&tag=';

  return dispatch =>{
    dispatch(fetchHomeList(isLoadMore,isRefreshing,isLoading));
    Util.get(URL
      ,(response)=>{
        dispatch(receiveHomeList(response.pins));
      }
      ,(error)=>{
        dispatch(receiveHomeList([]));
      }

    )
  }

}

let fetchHomeList = (isLoadMore,isRefreshing,isLoading)=>{
  return {
    type : types.FETCH_HOME_LIST,
    isLoadMore : isLoadMore,
    isRefreshing : isRefreshing,
    isLoading: isLoading,
  };
}

let receiveHomeList = (homeList)=>{
  return{
    type : types.RECEIVE_HOME_LIST,
    homeList :homeList,
  }
}
