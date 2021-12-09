import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {ProductoServicio} from './producto-servicio.model';

@model()
export class DetallePedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Pedido)
  pedidoId: string;

  @belongsTo(() => ProductoServicio)
  productoServicioId: string;

  constructor(data?: Partial<DetallePedido>) {
    super(data);
  }
}

export interface DetallePedidoRelations {
  // describe navigational properties here
}

export type DetallePedidoWithRelations = DetallePedido & DetallePedidoRelations;
