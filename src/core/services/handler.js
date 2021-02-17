import { AppError } from "../AppError";

export class CoreHandler {

  constructor(usecase) {
    this.usecase = usecase;
  }

  responseJson(data, res, next) {
    if (data.code === 200) {
      return res.status(data.code).json(data);
    }
    return next(new AppError(data.message, data.code));
  }
}