import * as Joi from '@hapi/joi';

export const CatJoiSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
