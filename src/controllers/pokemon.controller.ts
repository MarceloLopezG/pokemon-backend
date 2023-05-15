import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Paginate, Pokemon} from '../models';
import {PokemonRepository} from '../repositories';


export class PokemonController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) { }

  // Get especific pokemon by id
  @get('/pokemon/{id}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number): Promise<Pokemon> {
    return this.pokemonRepository.findById(id);
  }


  // Search pokemon by pokemonName && get all existing pokemon
  @post('/pokemon/filter', {
    responses: {
      '200': {
        description: 'Identifición de usuarios'
      }
    }
  })
  async filterPokemon(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paginate),
        },
      },
    }) paginate: Paginate): Promise<object> {

    let pokemonName = paginate.pokemonName;
    let pokemonList = [];

    const {limit, offset} = this.getPagination(paginate.page, paginate.size);
    const pokemonCountAll = await this.pokemonRepository.count();

    if (pokemonName === null || pokemonName === '') {
      // Get all existing pokemon
      pokemonList = await this.pokemonRepository.find({
        limit: limit,
        offset: offset
      });
    } else {
      // Filter by pokemonName
      pokemonList = await this.pokemonRepository.find(
        {
          where: {
            name:
            {
              "ilike": `%${paginate.pokemonName}%`
            }
          },
          limit: limit,
          offset: offset
        }
      );
    }


    if (pokemonList) {
      const result = this.getPagingData(pokemonList, paginate.page, limit, pokemonCountAll.count);
      return {
        result
      };
    } else {
      return {
        pokemonList
      };
    }
  };


  // GET LIMIT & OFFSET PAGINATE
  getPagination(page: number, size: number) {
    const limit = size ? + size : 6; // by default get 6 elements
    const offset = page ? page * limit : 0;
    return {limit, offset};
  };


  // GET DATA & PAGINATION DATA
  getPagingData = (data: any, page: number, limit: any, count: number) => {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    return {count, data, totalPages, currentPage};
  };
}
