/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

import { performance } from 'perf_hooks';
import { app } from './app';
import MongoConnection from './mongo-connection';
import { logger } from './logger';
import { flowSeed } from './seed/FlowSeed';

const mongoConnection = new MongoConnection(process.env.MONGO_URL ?? '');

if (process.env.MONGO_URL == null) {
  logger.log({
    level: 'error',
    message: 'MONGO_URL not specified in environment'
  });
  process.exit(1);
} else {
  mongoConnection.connect(async () => {
    const start = performance.now();
    await flowSeed();
    const timeTaken = performance.now() - start;
    console.log(`Total time taken : ${timeTaken} milliseconds`);
    app.listen(app.get('port'), (): void => {
      console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
        `🌏 Express server started at http://localhost:${app.get('port')}   `);
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    }
    process.exit(0);
  });
});
