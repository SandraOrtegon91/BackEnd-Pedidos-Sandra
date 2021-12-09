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
  ProveedorContratista,
  Consulta,
} from '../models';
import {ProveedorContratistaRepository} from '../repositories';

export class ProveedorContratistaConsultaController {
  constructor(
    @repository(ProveedorContratistaRepository) protected proveedorContratistaRepository: ProveedorContratistaRepository,
  ) { }

  @get('/proveedor-contratistas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of ProveedorContratista has many Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consulta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.proveedorContratistaRepository.consultas(id).find(filter);
  }

  @post('/proveedor-contratistas/{id}/consultas', {
    responses: {
      '200': {
        description: 'ProveedorContratista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProveedorContratista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInProveedorContratista',
            exclude: ['id'],
            optional: ['proveedorContratistaId']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.proveedorContratistaRepository.consultas(id).create(consulta);
  }

  @patch('/proveedor-contratistas/{id}/consultas', {
    responses: {
      '200': {
        description: 'ProveedorContratista.Consulta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Partial<Consulta>,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.consultas(id).patch(consulta, where);
  }

  @del('/proveedor-contratistas/{id}/consultas', {
    responses: {
      '200': {
        description: 'ProveedorContratista.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.consultas(id).delete(where);
  }
}
