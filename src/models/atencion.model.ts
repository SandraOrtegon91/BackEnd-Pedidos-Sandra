import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Asesor} from './asesor.model';

@model()
export class Atencion extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  horaInicio: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Asesor)
  asesorId: string;



  @property({
    type: 'string',
    required: true,
  })
  horaFin: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesAtencion: string;


  constructor(data?: Partial<Atencion>) {
    super(data);
  }
}

export interface AtencionRelations {
  // describe navigational properties here
}

export type AtencionWithRelations = Atencion & AtencionRelations;
