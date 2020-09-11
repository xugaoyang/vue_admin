import Joi from 'joi'

export default {
  dataPageValidate(obj) {
    const schema = Joi.object().keys({
      pageSize: Joi.number()
        .integer()
        .min(1)
        .max(999)
        .optional(),
      pageNo: Joi.number()
        .integer()
        .optional(),
    })
    const { error, value } = Joi.validate(obj, schema)
    if (error) {
      console.log('dataPageValidate error', error.details)
      return {}
    }
    return value
  },
  orderByValidate(obj) {
    const schema = Joi.object().keys({
      name: Joi.string().optional(),
      order: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .optional()
        .notes('["0是倒序", "1是正序"]'),
    })
    const { error, value } = Joi.validate(obj, schema)
    if (error) {
      console.log('orderByValidate error', error.details)
      return {}
    }
    return value
  },
}
