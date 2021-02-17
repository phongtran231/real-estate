import { CoreRepo } from "../../core/services/repo";
import { UserModel } from "./model";

export class UserRepo extends CoreRepo {
  constructor() {
    super(UserModel);
  }
}
