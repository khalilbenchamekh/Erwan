import * as fs from 'fs';
import * as path from 'path';
import { isFlowTypeArray, ParseResult, safeJsonParse } from '../utils/index';
import { logger } from '../logger';
import { GFlow, IFlow, AFlow } from '../models/Flow';
import { FlowEnum } from '../models/Enum/FlowEnum';

export async function flowSeed():Promise<void> {
  const itemResult = await GFlow.find({}).exec();
  if (itemResult.length === 0) {
    try {
      const amazonSeedDataRaw :string |undefined = fs.readFileSync(path.join(__dirname, '../data/AMZN-stock-price.json'), 'utf-8');
      const googleSeedDataRaw:string |undefined = fs.readFileSync(path.join(__dirname, '../data/GOOG-stock-price.json'), 'utf-8');
      const seedDataAmazon: ParseResult<Array<IFlow>> = safeJsonParse(isFlowTypeArray)(amazonSeedDataRaw);
      const seedDataGoogle: ParseResult<Array<IFlow>> = safeJsonParse(isFlowTypeArray)(googleSeedDataRaw);
      // eslint-disable-next-line no-use-before-define
      await Seed(seedDataGoogle, FlowEnum.Google);
      // eslint-disable-next-line no-use-before-define
      await Seed(seedDataAmazon, FlowEnum.Amazon);
    } catch (e) {
      logger.log({
        level: 'error',
        message: e
      });
    }
  }
  console.log('database seeded');
};

async function Seed(result:ParseResult<Array<IFlow>>, type: FlowEnum) {
  if (result.hasError) {
    logger.log({
      level: 'error',
      message: result.error ?? ''
    });
  } else {
    // eslint-disable-next-line no-unused-expressions
    type !== FlowEnum.Amazon ? await GFlow.insertMany(result.parsed) : await AFlow.insertMany(result.parsed);
  }
}
