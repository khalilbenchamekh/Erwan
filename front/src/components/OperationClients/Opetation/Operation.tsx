import { IUserINfo } from "src/Reducers/data";

interface IOperation{
    item : IUserINfo
}
const Operation=({item}:IOperation)=>{   
    return(
        <div>
            {item.name} devrait acheter {item.prixAction} $ d'action {item.comp} le {item.dataAchtAction}  au prix de {item.prixActAction} $
            Il devrait ensuite vendre ces actions le {item.dataVendAction} au prix de {item.prixVendAction}$ pour faire un gain de XX,XX $
        </div>
    );
}

export default Operation;
