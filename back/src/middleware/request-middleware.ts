import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';
import { BadRequest, UnauthorizedRequest } from '../errors';
import { logger } from '../logger';

const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema
  },
  skipJwtAuth?: boolean
};

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
export const relogRequestHandler = (
  handler: RequestHandler,
  options?: HandlerOptions,
): RequestHandler => async (req, res, next) => {
  logger.log({
    level: 'info',
    message: req?.url
  });
  if (options?.validation?.body) {
    const { error } = options?.validation?.body.validate(req?.body);
    if (error != null) {
      return next(new BadRequest(getMessageFromJoiError(error)));
    }
  }
  return handler(req, res, next);
};
