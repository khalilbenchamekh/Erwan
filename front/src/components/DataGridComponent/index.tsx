import { useEffect } from "react";
import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import { useDispatch, useSelector } from "react-redux";
import { getListOperayion } from "../../Actions/userAction";
import Environment from "../../Env/Environment";
import { IState } from "../../Reducers/data";
import DataGrid from 'devextreme-react/data-grid';

const columns = ['Date', 'Action', 'Name', 'Price', 'Nbr','Total','Port'];

const DataGridComponent = () => {
    const actionUrl = Environment.apiUrlDataUser;
    const dispatch = useDispatch();
    const {dataGrid} = useSelector(
        (state:IState) => state.data
      );

    useEffect(()=>{
        dispatch(getListOperayion())
    },[actionUrl]);
    return (
        <div>
            <DataGrid
            id="dataGrid"
            dataSource={dataGrid}
            keyExpr="Name"
            defaultColumns={columns}
            showBorders={true}
        />
        </div>
    );
}

export default DataGridComponent;
