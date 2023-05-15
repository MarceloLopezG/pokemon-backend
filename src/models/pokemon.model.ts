import { Entity, hasMany, model, property } from '@loopback/repository';
import { Pokemonlike } from './pokemonlike.model';

@model()
export class Pokemon extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'string',
    required: true,
  })
  back_shiny: string;

  @property({
    type: 'string',
    required: true,
  })
  front_shiny: string;

  @property({
    type: 'string',
    required: true,
  })
  front_default: string;

  @property({
    type: 'string',
    required: false,
  })
  type_one: string;

  @property({
    type: 'string',
    required: false,
  })
  type_two: string;

  @hasMany(() => Pokemonlike)
  pokemonlikes: Pokemonlike[];

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
