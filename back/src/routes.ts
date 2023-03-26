import { RequestHandler, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import client from './redis';

import * as ActionController from './controllers/action';

(async () => {
  // eslint-disable-next-line no-console
  client.on('error', (error: any) => console.error(`Error : ${error}`));
  await client.connect();
})();

const cacheData: RequestHandler = async (req, res, next) => {
  const { name } = req.params;
  let results;
  try {
    const cacheResults = await client.get(name);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
};

export const router = Router();
// Erwan routes
router.get('/action/price', ActionController.allAction);
router.get('/action/decision', ActionController.decision);
router.post('/action/decision', ActionController.save);
router.get('/action/getSpeciesData/:name', cacheData, ActionController.getSpeciesData);

if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  // router.get('/dev/api-docs', swaggerUi.setup(apiSpec));
}
