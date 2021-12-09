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
import {Atencion} from '../models';
import {AtencionRepository} from '../repositories';

export class AtencionController {
  constructor(
    @repository(AtencionRepository)
    public atencionRepository : AtencionRepository,
  ) {}

  @post('/atencions')
  @response(200, {
    description: 'Atencion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atencion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {
            title: 'NewAtencion',
            exclude: ['id'],
          }),
        },
      },
    })
    atencion: Omit<Atencion, 'id'>,
  ): Promise<Atencion> {
    return this.atencionRepository.create(atencion);
  }

  @get('/atencions/count')
  @response(200, {
    description: 'Atencion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atencion) where?: Where<Atencion>,
  ): Promise<Count> {
    return this.atencionRepository.count(where);
  }

  @get('/atencions')
  @response(200, {
    description: 'Array of Atencion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atencion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atencion) filter?: Filter<Atencion>,
  ): Promise<Atencion[]> {
    return this.atencionRepository.find(filter);
  }

  @patch('/atencions')
  @response(200, {
    description: 'Atencion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {partial: true}),
        },
      },
    })
    atencion: Atencion,
    @param.where(Atencion) where?: Where<Atencion>,
  ): Promise<Count> {
    return this.atencionRepository.updateAll(atencion, where);
  }

  @get('/atencions/{id}')
  @response(200, {
    description: 'Atencion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atencion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Atencion, {exclude: 'where'}) filter?: FilterExcludingWhere<Atencion>
  ): Promise<Atencion> {
    return this.atencionRepository.findById(id, filter);
  }

  @patch('/atencions/{id}')
  @response(204, {
    description: 'Atencion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atencion, {partial: true}),
        },
      },
    })
    atencion: Atencion,
  ): Promise<void> {
    await this.atencionRepository.updateById(id, atencion);
  }

  @put('/atencions/{id}')
  @response(204, {
    description: 'Atencion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() atencion: Atencion,
  ): Promise<void> {
    await this.atencionRepository.replaceById(id, atencion);
  }

  @del('/atencions/{id}')
  @response(204, {
    description: 'Atencion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.atencionRepository.deleteById(id);
  }
}
