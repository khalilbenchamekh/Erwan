import ChartPrix from 'src/components/ChartPrix/ChartPrix';
import OperationClients from 'src/components/OperationClients/OperationClients';
import DataGridComponent from 'src/components/DataGridComponent';
const Layout=()=>{
    
    return(
        
        <div><ChartPrix />
        <OperationClients />
        <DataGridComponent />
        </div>
    );
}
export default Layout;
