import { GET_All_ACTION_SUCCESS, GET_All_DATA, GET_DATA_SUCCESS, GET_LIST_OPERATION_SUCCESS } from "src/Actions/action";

export interface IState{
  data:{
    data?:IData[],
    dataGrid?:IDataGrid[],
    actions?:IUserINfo[]
  }
}
const initialState = {
    data:[],
    actions: [],
    dataGrid: [],
}

export type IDataGrid ={
  Date:string,
  Action:string,
  Name:string,
  Price:number,
  Nbr:number,
  Total:number,
  Port:number
}

export type IData={
    month ?: string;
    google ?: number;
    amazon ?: number
}

export type IUserINfo={
  name ?: string;
  dataAchtAction ?: string;
  prixAction ?: number;
  prixActAction ?: number;
  dataVendAction ?: number;
  prixVendAction ?: number;
  comp ?: number
}
  export default function data(state = initialState, action) {
    switch (action.type) {
      case GET_DATA_SUCCESS:
        return {
          ...state,
          data: action.data,
        } 
        case GET_All_ACTION_SUCCESS:
        return {
          ...state,
          actions: action.data,
        }
        case GET_LIST_OPERATION_SUCCESS:
          console.log(action.data)
        return {
          ...state,
          dataGrid: action.data,
        }
         
      default:
        return state
    }
  }