import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAction } from "src/Actions/userAction";
import Environment from "src/Env/Environment";
import { IState } from "src/Reducers/data";
import Operation from "./Opetation/Operation";

const OperationClients=()=>{
    const actionUrl = Environment.apiUrlDataAction;
    const dispatch = useDispatch();
    const {actions} = useSelector(
        (state:IState) => state.data
      );

    useEffect(()=>{
        dispatch(getAllAction())
    },[actionUrl]);

    return(
        <div>
            {
                actions?.map(item=>(
                    <Operation item={item} />
                ))
            }
            
            </div>
    );
}

export default OperationClients;
