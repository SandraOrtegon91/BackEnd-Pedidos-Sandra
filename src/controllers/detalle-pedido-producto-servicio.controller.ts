import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetallePedido,
  ProductoServicio,
} from '../models';
import {DetallePedidoRepository} from '../repositories';

export class DetallePedidoProductoServicioController {
  constructor(
    @repository(DetallePedidoRepository)
    public detallePedidoRepository: DetallePedidoRepository,
  ) { }

  @get('/detalle-pedidos/{id}/producto-servicio', {
    responses: {
      '200': {
        description: 'ProductoServicio belonging to DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoServicio)},
          },
        },
      },
    },
  })
  async getProductoServicio(
    @param.path.string('id') id: typeof DetallePedido.prototype.id,
  ): Promise<ProductoServicio> {
    return this.detallePedidoRepository.productoServicio(id);
  }
}
