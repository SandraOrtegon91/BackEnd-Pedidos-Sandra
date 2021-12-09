import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {ProductoServicio} from './producto-servicio.model';
import {Consulta} from './consulta.model';

@model()
export class ProveedorContratista extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  cuidad: string;

  @belongsTo(() => ProductoServicio)
  productoServicioId: string;

  @hasMany(() => Consulta)
  consultas: Consulta[];

  constructor(data?: Partial<ProveedorContratista>) {
    super(data);
  }
}

export interface ProveedorContratistaRelations {
  // describe navigational properties here
}

export type ProveedorContratistaWithRelations = ProveedorContratista & ProveedorContratistaRelations;
