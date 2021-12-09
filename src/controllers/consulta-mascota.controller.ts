import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Consulta,
  Mascota,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaMascotaController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Consulta.prototype.id,
  ): Promise<Mascota> {
    return this.consultaRepository.mascota(id);
  }
}
