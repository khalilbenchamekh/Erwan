import {
  Document, Model, Schema, model, Types
} from 'mongoose';
import { FlowEnum } from './Enum/FlowEnum';

export interface IDeed extends Document {
      user: String;
      type:FlowEnum;
      flowId: Types.ObjectId;
      price: Number;
      qty: Number;
      total: Number;
      totalInit: Number;
      createdOn: Date;
      updatedOn: Date;
};

interface IDeedModel extends Model<IDeed> { }

const schemaDeed = new Schema({
  user: { type: String, required: true },
  type: {
    type: String,
    enum: FlowEnum,
    default: FlowEnum.Amazon
  },
  flowId: {
    type: Types.ObjectId
  },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  total: { type: Number, required: true },
  totalInit: { type: Number, required: true }
}, { timestamps: true });

export const Deed: IDeedModel = model<IDeed, IDeedModel>('Deeds', schemaDeed);
