import {
  Document, Model, Schema, model
} from 'mongoose';
import { FlowEnum } from './Enum/FlowEnum';

export interface IFlow extends Document {
    v: Number;
    vw: Number;
    o: Number;
    c: Number;
    highestPriceOfTheDay: Number;
    lowestPriceOfTheDay: Number;
    timestamp : Date,
    n: Number;
    createdOn: Date;
    updatedOn: Date;
}

export interface IGFlow extends Document {
  type: FlowEnum.Google,
  flow : IFlow
}

export interface IAmazonFlow extends Document {
  type: FlowEnum.Amazon,
  flow : IFlow
}
interface IGFlowModel extends Model<IGFlow> { }
interface IAmazonFlowModel extends Model<IAmazonFlow> { }

export const schemaFlow = {
  v: { type: Number, required: true },
  vw: { type: Number, required: true },
  n: { type: Number, required: true },
  c: { type: Number, required: true },
  o: { type: Number, required: true },
  highestPriceOfTheDay: { type: Number, required: true },
  lowestPriceOfTheDay: { type: Number, required: true },
  timestamp: { type: Date, required: true }
};

const schemaGFlow = new Schema(schemaFlow, { timestamps: true });
const schemaAFlow = new Schema(schemaFlow, { timestamps: true });

export const GFlow: IGFlowModel = model<IGFlow, IGFlowModel>('GFlows', schemaGFlow);

export const AFlow: IAmazonFlowModel = model<IAmazonFlow, IAmazonFlowModel>('AFlows', schemaAFlow);
