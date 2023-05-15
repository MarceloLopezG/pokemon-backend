import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Pokemon} from './pokemon.model';

@model()
export class Pokemonlike extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'boolean',
    required: true,
  })
  liked: boolean;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Pokemon)
  pokemonId: number;

  constructor(data?: Partial<Pokemonlike>) {
    super(data);
  }
}

export interface PokemonlikeRelations {
  // describe navigational properties here
}

export type PokemonlikeWithRelations = Pokemonlike & PokemonlikeRelations;
