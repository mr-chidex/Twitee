import Joi from 'joi';

import { ITwit } from '../prisma';

export const validateTWit = (twit: ITwit) => {
  return Joi.object({
    twit: Joi.string().min(1).trim().required(),
  }).validate(twit);
};

export const validateComment = (twit: ITwit) => {
  return Joi.object({
    twit: Joi.string().min(3).trim().required(),
    twitId: Joi.number().required(),
  }).validate(twit);
};
