import {
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Pokemonlike} from '../models';
import {PokemonlikeRepository} from '../repositories';



export class PokemonlikeController {
  constructor(
    @repository(PokemonlikeRepository)
    public pokemonlikeRepository: PokemonlikeRepository,
  ) { }

  //@authenticate('jwt')
  // Add a like
  @post('/pokemonlikes/create')
  @response(200, {
    description: 'Pokemonlike model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pokemonlike)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemonlike, {
            title: 'NewPokemonlike',
            exclude: ['id'],
          }),
        },
      },
    })
    pokemonlike: Omit<Pokemonlike, 'id'>,
  ): Promise<Pokemonlike> {
    return this.pokemonlikeRepository.create(pokemonlike);
  }

  // Get especific like by userId && pokemonId
  @get('/mypokemonlike/{userId}/{pokemonId}', {
    responses: {
      '200': {
        description: 'Array of User has many Pokemonlike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pokemonlike)},
          },
        },
      },
    },
  })
  async getSpecificLikeByIdUser(@param.path.number('userId') userId: number, @param.path.number('pokemonId') pokemonId: number): Promise<object> {
    // Ensure the record exists
    let pokemonlike = await this.pokemonlikeRepository.findOne({where: {userId: userId, pokemonId: pokemonId}});
    if (pokemonlike) {
      return {
        id: pokemonlike.id,
        liked: pokemonlike.liked,
      };
    } else {
      return {
        liked: false,
      };
    }
  }


  // Remove a like by Id
  @del('/pokemonlikes/delete/{id}')
  @response(204, {
    description: 'Pokemonlike DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pokemonlikeRepository.deleteById(id);
  }
}
