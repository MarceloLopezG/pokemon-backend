import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbconnectionDataSource} from '../datasources';
import {Pokemon, Pokemonlike, PokemonlikeRelations, User} from '../models';
import {PokemonRepository} from './pokemon.repository';
import {UserRepository} from './user.repository';

export class PokemonlikeRepository extends DefaultCrudRepository<
  Pokemonlike,
  typeof Pokemonlike.prototype.id,
  PokemonlikeRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Pokemonlike.prototype.id>;

  public readonly pokemon: BelongsToAccessor<Pokemon, typeof Pokemonlike.prototype.id>;

  constructor(
    @inject('datasources.dbconnection') dataSource: DbconnectionDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PokemonRepository') protected pokemonRepositoryGetter: Getter<PokemonRepository>,
  ) {
    super(Pokemonlike, dataSource);
    this.pokemon = this.createBelongsToAccessorFor('pokemon', pokemonRepositoryGetter,);
    this.registerInclusionResolver('pokemon', this.pokemon.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
