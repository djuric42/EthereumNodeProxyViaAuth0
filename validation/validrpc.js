var Joi = require('joi')

module.exports = {
  body: {
    method: Joi.string().required()
  }
}
