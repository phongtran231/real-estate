import { Context } from "../helpers/context";
import { verify } from "jsonwebtoken"
import { AppError } from "../core/AppError";
import config from "../config";
import { StatusCodes } from 'http-status-codes';
import { UserRepo } from "../components/auth/repo";

export const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-token'];
    if (!token) {
      next(new AppError("Truy cập bị từ chối !", StatusCodes.UNAUTHORIZED))
    }
    verify(token, config.server.secret_key, async (err, tokenValue) => {
      if (err) {
        next(new AppError("Truy cập bị từ chối !", StatusCodes.UNAUTHORIZED))
      }
      const userRepo = new UserRepo();
      const user = await userRepo.findOne({uuid: tokenValue.uuid}, {uuid: true, email: true, name: true, phone: true});
      console.log(user);
      const context = new Context();
      context.currentUser = user;
      next()
    });
  }
}
