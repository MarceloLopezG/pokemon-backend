import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbconnectionDataSource} from '../datasources';
import {Pokemon, PokemonRelations, Pokemonlike} from '../models';
import {PokemonlikeRepository} from './pokemonlike.repository';

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id,
  PokemonRelations
> {

  public readonly pokemonlikes: HasManyRepositoryFactory<Pokemonlike, typeof Pokemon.prototype.id>;

  constructor(
    @inject('datasources.dbconnection') dataSource: DbconnectionDataSource, @repository.getter('PokemonlikeRepository') protected pokemonlikeRepositoryGetter: Getter<PokemonlikeRepository>,
  ) {
    super(Pokemon, dataSource);
    this.pokemonlikes = this.createHasManyRepositoryFactoryFor('pokemonlikes', pokemonlikeRepositoryGetter,);
    this.registerInclusionResolver('pokemonlikes', this.pokemonlikes.inclusionResolver);
  }
}
