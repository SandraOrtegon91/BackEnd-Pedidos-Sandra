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
  Mascota,
  Consulta,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaConsultaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Consulta',
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
    return this.mascotaRepository.consultas(id).find(filter);
  }

  @post('/mascotas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.mascotaRepository.consultas(id).create(consulta);
  }

  @patch('/mascotas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Mascota.Consulta PATCH success count',
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
    return this.mascotaRepository.consultas(id).patch(consulta, where);
  }

  @del('/mascotas/{id}/consultas', {
    responses: {
      '200': {
        description: 'Mascota.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.mascotaRepository.consultas(id).delete(where);
  }
}
