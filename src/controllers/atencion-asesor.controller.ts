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
  Asesor,
} from '../models';
import {AtencionRepository} from '../repositories';

export class AtencionAsesorController {
  constructor(
    @repository(AtencionRepository)
    public atencionRepository: AtencionRepository,
  ) { }

  @get('/atencions/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Atencion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Atencion.prototype.id,
  ): Promise<Asesor> {
    return this.atencionRepository.asesor(id);
  }
}
