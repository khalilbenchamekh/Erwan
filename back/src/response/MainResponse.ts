import { IFlow } from '../models/Flow';

export type MainStatistiquesResponse<T> = {
    google : T,
    amazon : T,
}

export type Statistiques = {
    totalValueOfBothFields?:Number,
    _id?: _ID
}

type _ID = {
    month : Number,
    year : Number,
}

export type Decision ={
    buy : IFlow,
    sell : IFlow,
}
