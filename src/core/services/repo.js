import { Context } from "./../../helpers/context";

export class CoreRepo {
  constructor(model) {
    this.model = model;
    this.context = new Context()
  }

  findAll(field = {}) {
    return this.model.find({}, field);
  }

  async findOne(condition, field = {}) {
    return this.model.findOne(condition, field);
  }
}
