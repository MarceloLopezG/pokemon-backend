import {Model, model, property} from '@loopback/repository';

@model()
export class Paginate extends Model {
  @property({
    type: 'string',
    required: false,
  })
  pokemonName: string;

  @property({
    type: 'number',
    required: true,
  })
  page: number;

  @property({
    type: 'number',
    required: true,
  })
  size: number;


  constructor(data?: Partial<Paginate>) {
    super(data);
  }
}

export interface PaginateRelations {
  // describe navigational properties here
}

export type PaginateWithRelations = Paginate & PaginateRelations;
