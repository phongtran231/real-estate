export class CoreService {
  constructor(repo) {
    this.repo = repo;
  }

  findAll(field = {}) {
    return this.repo.findAll(field);
  }

  findOne(condition, field = {}) {
    return this.repo.findOne(condition, field);
  }

}
