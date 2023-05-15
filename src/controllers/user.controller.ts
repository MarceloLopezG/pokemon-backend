import {service} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  HttpErrors,
  getModelSchemaRef,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Credentials, User} from '../models';
import {UserRepository} from '../repositories';
import {JwtService} from '../services';

import {TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(JwtService)
    public serviceJWT: JwtService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) { }


  // Sign up
  @post('/users/signup')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }


  // Login by email && password
  @post('/users/login', {
    responses: {
      '200': {
        description: 'Identifición de usuarios'
      }
    }
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials),
        },
      },
    }) credentials: Credentials): Promise<object> {
    // Ensure the user exists, and the password is correct
    let user = await this.userRepository.findOne({where: {email: credentials.email, password: credentials.password}});
    if (user) {
      let token = this.serviceJWT.GenerateTokenJWT(user);
      return {
        user: user,
        token: token
      };
    } else {
      throw new HttpErrors[401]("Unauthorized user!");
    }
  }
}
