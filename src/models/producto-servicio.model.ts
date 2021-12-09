import {Entity, model, property, hasMany} from '@loopback/repository';
import {DetallePedido} from './detalle-pedido.model';
import {ProveedorContratista} from './proveedor-contratista.model';

@model()
export class ProductoServicio extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precioCosto: number;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  @hasMany(() => ProveedorContratista)
  proveedorContratistas: ProveedorContratista[];



  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;

  @property({
    type: 'string',
    required: true,
  })
  proveedor: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;


  constructor(data?: Partial<ProductoServicio>) {
    super(data);
  }
}

export interface ProductoServicioRelations {
  // describe navigational properties here
}

export type ProductoServicioWithRelations = ProductoServicio & ProductoServicioRelations;
