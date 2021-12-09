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
  Asesor,
  Atencion,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorAtencionController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/atencions', {
    responses: {
      '200': {
        description: 'Array of Asesor has many Atencion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atencion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atencion>,
  ): Promise<Atencion[]> {
    return this.asesorRepository.atencions(id).find(filter);
  }

  @post('/asesors/{id}/atencions', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atencion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {
            title: 'NewAtencionInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) atencion: Omit<Atencion, 'id'>,
  ): Promise<Atencion> {
    return this.asesorRepository.atencions(id).create(atencion);
  }

  @patch('/asesors/{id}/atencions', {
    responses: {
      '200': {
        description: 'Asesor.Atencion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {partial: true}),
        },
      },
    })
    atencion: Partial<Atencion>,
    @param.query.object('where', getWhereSchemaFor(Atencion)) where?: Where<Atencion>,
  ): Promise<Count> {
    return this.asesorRepository.atencions(id).patch(atencion, where);
  }

  @del('/asesors/{id}/atencions', {
    responses: {
      '200': {
        description: 'Asesor.Atencion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atencion)) where?: Where<Atencion>,
  ): Promise<Count> {
    return this.asesorRepository.atencions(id).delete(where);
  }
}
