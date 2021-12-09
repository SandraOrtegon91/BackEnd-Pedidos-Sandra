import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProductoServicio,
  DetallePedido,
} from '../models';
import {ProductoServicioRepository} from '../repositories';

export class ProductoServicioDetallePedidoController {
  constructor(
    @repository(ProductoServicioRepository) protected productoServicioRepository: ProductoServicioRepository,
  ) { }

  @get('/producto-servicios/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Array of ProductoServicio has many DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetallePedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetallePedido>,
  ): Promise<DetallePedido[]> {
    return this.productoServicioRepository.detallePedidos(id).find(filter);
  }

  @post('/producto-servicios/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'ProductoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallePedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {
            title: 'NewDetallePedidoInProductoServicio',
            exclude: ['id'],
            optional: ['productoServicioId']
          }),
        },
      },
    }) detallePedido: Omit<DetallePedido, 'id'>,
  ): Promise<DetallePedido> {
    return this.productoServicioRepository.detallePedidos(id).create(detallePedido);
  }

  @patch('/producto-servicios/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'ProductoServicio.DetallePedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {partial: true}),
        },
      },
    })
    detallePedido: Partial<DetallePedido>,
    @param.query.object('where', getWhereSchemaFor(DetallePedido)) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.productoServicioRepository.detallePedidos(id).patch(detallePedido, where);
  }

  @del('/producto-servicios/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'ProductoServicio.DetallePedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallePedido)) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.productoServicioRepository.detallePedidos(id).delete(where);
  }
}
