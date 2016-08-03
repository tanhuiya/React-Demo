import * as types from '../actions/actionType';

const initialState = {
  ClassDetailData : [],
  isLoading : true,
  isRefreshing : true,
  isLoadMore : false,
}

let ClassDetailReducer = (state = initialState,action)=>{
  switch ( action.type ) {
    case types.FETCH_CLASS_DETAIL_LIST:
      return Object.assign({},state,{
        isLoading : action.isLoading,
        isLoadMore : action.isLoadMore,
        isRefreshing : action.isRefreshing,
      })
      break;
    case types.RECEIVE_CLASS_DETAIL_LIST:
      return Object.assign({},state,{
        ClassDetailData :state.isLoadMore?state.ClassDetailData.concat(action.ClassDetailData):action.ClassDetailData,
        isLoading : false,
        isRefreshing : false,
      })
      break;
    case types.RESET_DETAIL_LIST:
      return Object.assign({},state,{
        ClassDetailData : [],
        isLoading : true,
        isRefreshing :true,
      })
      break;
    default:
      return state;
  }
}

export default ClassDetailReducer;
