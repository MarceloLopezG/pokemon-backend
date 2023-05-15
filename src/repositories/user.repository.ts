import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbconnectionDataSource} from '../datasources';
import {Pokemonlike, User, UserRelations} from '../models';
import {PokemonlikeRepository} from './pokemonlike.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly pokemonlikes: HasManyRepositoryFactory<Pokemonlike, typeof User.prototype.id>;

  constructor(
    @inject('datasources.dbconnection') dataSource: DbconnectionDataSource, @repository.getter('PokemonlikeRepository') protected pokemonlikeRepositoryGetter: Getter<PokemonlikeRepository>,
  ) {
    super(User, dataSource);
    this.pokemonlikes = this.createHasManyRepositoryFactoryFor('pokemonlikes', pokemonlikeRepositoryGetter,);
    this.registerInclusionResolver('pokemonlikes', this.pokemonlikes.inclusionResolver);
  }
}
