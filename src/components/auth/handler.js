import { CoreHandler } from "../../core/services/handler";
import { AuthService } from "./usecase";

export class AuthHandler extends CoreHandler {
	constructor() {
		super(new AuthService());
	}

	async login(req, res, next) {
		const result = await this.usecase.login(req.body)
		return this.responseJson(result, res, next)
	}

	async getInfo(req, res, next) {
		const result = await this.usecase.getInfo();
		return this.responseJson(result, res, next);
	}
}
