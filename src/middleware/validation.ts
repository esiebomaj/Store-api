import { validationResult }  from "express-validator";
import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors)
  res.status(400).json({ errors: errors.array().map(i => `${i.msg}`) });
};

export default validate;
