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
  Atencion,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaAtencionController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/atencions', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Atencion',
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
    return this.mascotaRepository.atencions(id).find(filter);
  }

  @post('/mascotas/{id}/atencions', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atencion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {
            title: 'NewAtencionInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) atencion: Omit<Atencion, 'id'>,
  ): Promise<Atencion> {
    return this.mascotaRepository.atencions(id).create(atencion);
  }

  @patch('/mascotas/{id}/atencions', {
    responses: {
      '200': {
        description: 'Mascota.Atencion PATCH success count',
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
    return this.mascotaRepository.atencions(id).patch(atencion, where);
  }

  @del('/mascotas/{id}/atencions', {
    responses: {
      '200': {
        description: 'Mascota.Atencion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atencion)) where?: Where<Atencion>,
  ): Promise<Count> {
    return this.mascotaRepository.atencions(id).delete(where);
  }
}
