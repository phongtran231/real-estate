import { CoreHandler } from "../../core/services/handler";
import { LocationService } from "./usecase";

export class LocationHandler extends CoreHandler {

  constructor() {
    super(new LocationService());
  }

  async getCity(req, res, next) {
    const result = await this.usecase.getCity();
    return this.responseJson(result, res, next);
  }

  async getProvinceByCityId(req, res, next) {
    const { cityId } = req.params;
    const result = await this.usecase.getProvinceByCityId(cityId);
    return this.responseJson(result, res, next);
  }

  async getWardByProvicneId(req, res, next) {
    const { provinceId } = req.params;
    const result = await this.usecase.getWardByProvinceId(provinceId);
    return this.responseJson(result, res, next);
  }
}