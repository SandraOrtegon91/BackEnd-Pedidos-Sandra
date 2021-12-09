import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProveedorContratista} from '../models';
import {ProveedorContratistaRepository} from '../repositories';

export class ProveedorController {
  constructor(
    @repository(ProveedorContratistaRepository)
    public proveedorContratistaRepository : ProveedorContratistaRepository,
  ) {}

  @post('/proveedor-contratistas')
  @response(200, {
    description: 'ProveedorContratista model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProveedorContratista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {
            title: 'NewProveedorContratista',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedorContratista: Omit<ProveedorContratista, 'id'>,
  ): Promise<ProveedorContratista> {
    return this.proveedorContratistaRepository.create(proveedorContratista);
  }

  @get('/proveedor-contratistas/count')
  @response(200, {
    description: 'ProveedorContratista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProveedorContratista) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.count(where);
  }

  @get('/proveedor-contratistas')
  @response(200, {
    description: 'Array of ProveedorContratista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProveedorContratista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProveedorContratista) filter?: Filter<ProveedorContratista>,
  ): Promise<ProveedorContratista[]> {
    return this.proveedorContratistaRepository.find(filter);
  }

  @patch('/proveedor-contratistas')
  @response(200, {
    description: 'ProveedorContratista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {partial: true}),
        },
      },
    })
    proveedorContratista: ProveedorContratista,
    @param.where(ProveedorContratista) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.updateAll(proveedorContratista, where);
  }

  @get('/proveedor-contratistas/{id}')
  @response(200, {
    description: 'ProveedorContratista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProveedorContratista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProveedorContratista, {exclude: 'where'}) filter?: FilterExcludingWhere<ProveedorContratista>
  ): Promise<ProveedorContratista> {
    return this.proveedorContratistaRepository.findById(id, filter);
  }

  @patch('/proveedor-contratistas/{id}')
  @response(204, {
    description: 'ProveedorContratista PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {partial: true}),
        },
      },
    })
    proveedorContratista: ProveedorContratista,
  ): Promise<void> {
    await this.proveedorContratistaRepository.updateById(id, proveedorContratista);
  }

  @put('/proveedor-contratistas/{id}')
  @response(204, {
    description: 'ProveedorContratista PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proveedorContratista: ProveedorContratista,
  ): Promise<void> {
    await this.proveedorContratistaRepository.replaceById(id, proveedorContratista);
  }

  @del('/proveedor-contratistas/{id}')
  @response(204, {
    description: 'ProveedorContratista DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proveedorContratistaRepository.deleteById(id);
  }
}
