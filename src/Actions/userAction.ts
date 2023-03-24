import { GET_All_ACTION, GET_All_DATA, GET_LIST_OPERATION_ACTION} from "./action";

export type getDataType={
  type : string
}

export const  getData=(): getDataType=>{
  return {
      type:GET_All_DATA,
  }
}

export const  getAllAction=(): getDataType=>{
  return {
      type:GET_All_ACTION,
  }
}

export const  getListOperayion=(): getDataType=>{
  return {
      type:GET_LIST_OPERATION_ACTION,
  }
}
