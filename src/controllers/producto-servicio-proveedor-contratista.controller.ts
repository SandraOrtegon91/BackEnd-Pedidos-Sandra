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
  ProveedorContratista,
} from '../models';
import {ProductoServicioRepository} from '../repositories';

export class ProductoServicioProveedorContratistaController {
  constructor(
    @repository(ProductoServicioRepository) protected productoServicioRepository: ProductoServicioRepository,
  ) { }

  @get('/producto-servicios/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'Array of ProductoServicio has many ProveedorContratista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProveedorContratista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProveedorContratista>,
  ): Promise<ProveedorContratista[]> {
    return this.productoServicioRepository.proveedorContratistas(id).find(filter);
  }

  @post('/producto-servicios/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'ProductoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProveedorContratista)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {
            title: 'NewProveedorContratistaInProductoServicio',
            exclude: ['id'],
            optional: ['productoServicioId']
          }),
        },
      },
    }) proveedorContratista: Omit<ProveedorContratista, 'id'>,
  ): Promise<ProveedorContratista> {
    return this.productoServicioRepository.proveedorContratistas(id).create(proveedorContratista);
  }

  @patch('/producto-servicios/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'ProductoServicio.ProveedorContratista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {partial: true}),
        },
      },
    })
    proveedorContratista: Partial<ProveedorContratista>,
    @param.query.object('where', getWhereSchemaFor(ProveedorContratista)) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.productoServicioRepository.proveedorContratistas(id).patch(proveedorContratista, where);
  }

  @del('/producto-servicios/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'ProductoServicio.ProveedorContratista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProveedorContratista)) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.productoServicioRepository.proveedorContratistas(id).delete(where);
  }
}
