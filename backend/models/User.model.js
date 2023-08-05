const Joi = require("joi");
const nameSchema = Joi.object({
  title: Joi.string().max(10),
  first: Joi.string().max(50),
  last: Joi.string().max(50),
});

const streetSchema = Joi.object({
  number: Joi.number().integer(),
  name: Joi.string().max(100),
});

const coordinatesSchema = Joi.object({
  latitude: Joi.string(),
  longitude: Joi.string(),
});

const timezoneSchema = Joi.object({
  offset: Joi.string(),
  description: Joi.string(),
});

// schema for data validation
const dataSchema = Joi.object({
  results: Joi.array().items(
    Joi.object({
      gender: Joi.string().max(10),
      name: nameSchema,
      location: Joi.object({
        street: streetSchema,
        city: Joi.string().max(100),
        state: Joi.string().max(100),
        country: Joi.string().max(100),
        postcode: Joi.string().max(20),
        coordinates: coordinatesSchema,
        timezone: timezoneSchema,
      }),
      email: Joi.string().email(),
      login: Joi.object({
        uuid: Joi.string().uuid(),
        username: Joi.string().max(50),
        password: Joi.string().max(100),
        salt: Joi.string(),
        md5: Joi.string().hex(),
        sha1: Joi.string().hex(),
        sha256: Joi.string().hex(),
      }),
      dob: Joi.object({
        date: Joi.date().iso(),
        age: Joi.number().integer(),
      }),
      registered: Joi.object({
        date: Joi.date().iso(),
        age: Joi.number().integer(),
      }),
      phone: Joi.string().max(20),
      cell: Joi.string().max(20),
      id: Joi.object({
        name: Joi.string().max(50),
        value: Joi.string().max(50),
      }),
      picture: Joi.object({
        large: Joi.string().uri(),
        medium: Joi.string().uri(),
        thumbnail: Joi.string().uri(),
      }),
      nat: Joi.string().length(2),
    })
  ),
  info: Joi.object({
    seed: Joi.string(),
    results: Joi.number().integer(),
    page: Joi.number().integer(),
    version: Joi.string(),
  }),
});
module.exports = { dataSchema };
