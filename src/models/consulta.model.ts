import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProveedorContratista} from './proveedor-contratista.model';
import {Mascota} from './mascota.model';

@model()
export class Consulta extends Entity {
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
  fechaSolicitud: string;

  @belongsTo(() => ProveedorContratista)
  proveedorContratistaId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;



  @property({
    type: 'string',
    required: true,
  })
  fechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPago: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesConsulta: string;


  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
