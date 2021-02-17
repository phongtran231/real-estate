import { CoreService } from "../../core/services/service";
import { UserRepo } from "./repo";
import { sign } from 'jsonwebtoken';
import config from './../../config';
import { compareHash } from "../../helpers/hash";
import i18n from 'i18n';
import { Context } from "../../helpers/context";

export class AuthService extends CoreService {
  constructor() {
    super(new UserRepo());
  }

  async login(req) {
    const { email, password } = req;
    const user = await this.repo.findOne({email}, {uuid: true, password: true});
    if (!user) {
      return {
        code: 401,
        data: null,
        message: i18n.__('user not found'),
      };
    }    
    const checkPassword = await compareHash(String(password), user.password);
    if (!checkPassword) {
      return {
        code: 401,
        data: null,
        message: i18n.__('user not found'),
      };
    }
    const token = sign({uuid: user.uuid}, config.server.secret_key)
    return {
      token,
      code: 200
    }
  }

  async getInfo() {
    const context = new Context();
    console.log(context.currentUser);
    return {
      data: context.currentUser,
      code: 200,
    }
  }
}
