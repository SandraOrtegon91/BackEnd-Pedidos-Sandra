import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProveedorContratista,
  ProductoServicio,
} from '../models';
import {ProveedorContratistaRepository} from '../repositories';

export class ProveedorContratistaProductoServicioController {
  constructor(
    @repository(ProveedorContratistaRepository)
    public proveedorContratistaRepository: ProveedorContratistaRepository,
  ) { }

  @get('/proveedor-contratistas/{id}/producto-servicio', {
    responses: {
      '200': {
        description: 'ProductoServicio belonging to ProveedorContratista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoServicio)},
          },
        },
      },
    },
  })
  async getProductoServicio(
    @param.path.string('id') id: typeof ProveedorContratista.prototype.id,
  ): Promise<ProductoServicio> {
    return this.proveedorContratistaRepository.productoServicio(id);
  }
}
