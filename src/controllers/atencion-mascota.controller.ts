import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Atencion,
  Mascota,
} from '../models';
import {AtencionRepository} from '../repositories';

export class AtencionMascotaController {
  constructor(
    @repository(AtencionRepository)
    public atencionRepository: AtencionRepository,
  ) { }

  @get('/atencions/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Atencion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Atencion.prototype.id,
  ): Promise<Mascota> {
    return this.atencionRepository.mascota(id);
  }
}
