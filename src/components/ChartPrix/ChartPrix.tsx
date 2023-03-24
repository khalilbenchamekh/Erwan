import React, {useEffect} from 'react';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
import { useDispatch, useSelector } from 'react-redux';
import { IData, IState } from 'src/Reducers/data';
import { getData } from 'src/Actions/userAction';
import Environment from 'src/Env/Environment';


 const energySources = [
    { value: 'google', name: 'Google' },
    { value: 'amazon', name: 'Amazon' },
  ];

const  ChartPrix=()=> {
  const dispatch = useDispatch();
  const {data} = useSelector(
    (state:IState) => state.data
  );
  let urlApi = Environment.apiUrlData
  useEffect(()=>{
    dispatch(getData());
  },[urlApi]);

    return (
      <React.Fragment> 
        <Chart
          palette="Violet"
          dataSource={data}
        >
          <CommonSeriesSettings
            argumentField="month"
            type={'line'}
          />
          {
            energySources.map((item) => <Series
              key={item.value}
              valueField={item.value}
              name={item.name} />)
          }
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="Evolution du prix des actions Amazone et Google sur 2023">
          </Title>
          <Tooltip enabled={true} />
        </Chart>
      </React.Fragment>
    );
  
}


export default ChartPrix ;
