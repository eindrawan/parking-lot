const Joi = require("joi");

module.exports = {
  validate: (data, schema) => {
    let { value, error } = Joi.object(schema).validate(data);
    if (error) throw new Error(error);
    else return value;
  }
};
