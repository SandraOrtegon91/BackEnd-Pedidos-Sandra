import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Pedido extends Entity {
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
  fechaPedido: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];



  @property({
    type: 'string',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;


  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
