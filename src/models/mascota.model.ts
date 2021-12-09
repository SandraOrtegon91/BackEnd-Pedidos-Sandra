import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Consulta} from './consulta.model';
import {PagoPlanes} from './pago-planes.model';
import {Atencion} from './atencion.model';
import {Asesor} from './asesor.model';

@model()
export class Mascota extends Entity {
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
  cedulaDueño: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreDueño: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  fechanacimiento: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Consulta)
  consultas: Consulta[];

  @hasMany(() => PagoPlanes)
  pagoPlanes: PagoPlanes[];

  @hasMany(() => Atencion)
  atencions: Atencion[];

  @belongsTo(() => Asesor)
  asesorId: string;


  @property({
    type: 'string',
    required: true,
  })
  tipoAnimal: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  antecedentesSalud: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesAntecedentes: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSaludInicial: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesEstadoSalud: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
