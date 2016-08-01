import * as types from '../actions/actionType';

const initialState = {
  HomeList : [],
  isLoadMore : false,
  isLoading : true,
  isRefreshing : false,
}

let homeReducer = (state = initialState , action)=>{
  switch ( action.type) {
    case types.FETCH_HOME_LIST:
      return Object.assign({},state,{
        isLoadMore : action.isLoadMore,
        isLoading : action.isLoading,
        isRefreshing : action.isRefreshing,
      })
      break;
    case types.RECEIVE_HOME_LIST:
      return Object.assign({},
        state,
        {
          HomeList : state.isLoadMore? state.HomeList.concat(action.homeList):action.homeList,
          isRefreshing : false,
          isLoading : false,
        }
      )
      break;

    default:
      return state;
  }
}

export default homeReducer;
