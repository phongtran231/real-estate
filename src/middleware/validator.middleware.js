import { validationResult } from 'express-validator';
import i18n from "i18n";

export const validator = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: i18n.__(err.msg) }))

  return res.status(422).json({
    errors: extractedErrors,
    code: 422
  })
}
