import * as types from '../actions/actionType';

const initialState = {
  ClassData : [],
  isLoading : true,
}

let classReducer = (state = initialState,action)=>{
  switch ( action.type ) {
    case types.FETCH_CLASS_LIST:
      return Object.assign({},state,{
        isLoading : action.isLoading,
      })
      break;
    case types.RECEIVE_CLASS_LIST:
      return Object.assign({},state,{
        ClassData : action.classList,
        isLoading : false,
      })
      break;
    default:
      return state;
  }
}

export default classReducer;
