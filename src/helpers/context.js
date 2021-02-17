import httpContext from 'express-http-context';

export class Context {
  constructor() {
    this._currentUserContext = 'currentUser';
  }   

  set currentUser(user) {
    return httpContext.set(this._currentUserContext, user);
  }

  get currentUser() {
    return httpContext.get(this._currentUserContext);
  }
}