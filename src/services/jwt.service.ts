import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as keys} from '../config/keys';
import {User} from '../models';
var jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GenerateTokenJWT(user: User) {
    let mySecretKey = keys.jwtKey;
    let token = jwt.sign(
      {
        exp: keys.expiryDateJWT,
        data: {
          id: user.id,
          username: user.name,
          email: user.email
        }
      }, mySecretKey)

    return token;
  }
}
