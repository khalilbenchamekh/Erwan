import { RequestHandler } from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';
// eslint-disable-next-line import/no-extraneous-dependencies
import { joiObjectId } from 'ts-joi-objectid';
import client from '../../redis';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { FlowEnum } from '../../models/Enum/FlowEnum';
import { GFlow, AFlow } from '../../models/Flow';
import { Deed } from '../../models/Deed';
import { DecisionEnum } from '../../models/Enum/DecisionEnum';
// eslint-disable-next-line camelcase
const joi_oid = joiObjectId(Joi);

export const addDeedSchema = Joi.object().keys({
  name: Joi.string().required(),
  idFlow: joi_oid().required(),
  price: Joi.number().required(),
  nbr: Joi.number().required(),
  type: Joi.string().valid(FlowEnum.Google, FlowEnum.Amazon),
  decision: Joi.string().valid(DecisionEnum.buy, DecisionEnum.sell)
});

// eslint-disable-next-line camelcase, consistent-return
const getFirstPrice = async (std_id: string) => {
  try {
    // eslint-disable-next-line camelcase
    const cachedResult = await client.get(`st-${std_id}`);
    if (cachedResult) {
      const st = Deed.hydrate(JSON.parse(cachedResult));
      return st?.totalInit;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Something happened to Redis', error);
  }
  const res = await Deed.findOne({}).sort({ createdAt: -1 });
  return res ? res.totalInit : Number(process.env.PRICEINI);
};

const add: RequestHandler = async (req, res) => {
  const {
    name, idFlow, type, decision, price, nbr
  } = req.body;
  const result = decision !== FlowEnum.Amazon ? await GFlow.findById(idFlow) : await AFlow.findById(idFlow);
  if (result && price > 0 && nbr > 0) {
    const total:Number = price * nbr;
    const totalInit: Number = await getFirstPrice(name);
    const model = new Deed({
      name,
      type,
      idFlow,
      price,
      nbr,
      total,
      totalInit
    });
    await model.save();
    res.status(201).json(model.toJSON());
  }

  res.status(404).send('Not found');
};

export const save = relogRequestHandler(add, { validation: { body: addDeedSchema } });
