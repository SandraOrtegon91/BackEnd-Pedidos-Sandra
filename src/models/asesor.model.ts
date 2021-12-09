import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Atencion} from './atencion.model';
import {Mascota} from './mascota.model';
import {Administrador} from './administrador.model';

@model()
export class Asesor extends Entity {
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
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaVinculacion: string;

  @hasMany(() => Atencion)
  atencions: Atencion[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @belongsTo(() => Administrador)
  administradorId: string;




  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'number',
    required: true,
  })
  comision: number;

  @property({
    type: 'string',
    default: 1,
  })
  nivelAcceso: string;

  @property({
    type: 'string',
    default: 0,
  })
  clave?: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;


  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
