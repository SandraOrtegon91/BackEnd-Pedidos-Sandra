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
  ProveedorContratista,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaProveedorContratistaController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/proveedor-contratista', {
    responses: {
      '200': {
        description: 'ProveedorContratista belonging to Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProveedorContratista)},
          },
        },
      },
    },
  })
  async getProveedorContratista(
    @param.path.string('id') id: typeof Consulta.prototype.id,
  ): Promise<ProveedorContratista> {
    return this.consultaRepository.proveedorContratista(id);
  }
}
