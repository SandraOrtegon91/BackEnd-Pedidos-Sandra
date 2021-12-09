import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Consulta, PagoPlanes, Atencion, Asesor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaRepository} from './consulta.repository';
import {PagoPlanesRepository} from './pago-planes.repository';
import {AtencionRepository} from './atencion.repository';
import {AsesorRepository} from './asesor.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Mascota.prototype.id>;

  public readonly pagoPlanes: HasManyRepositoryFactory<PagoPlanes, typeof Mascota.prototype.id>;

  public readonly atencions: HasManyRepositoryFactory<Atencion, typeof Mascota.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('AtencionRepository') protected atencionRepositoryGetter: Getter<AtencionRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Mascota, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.atencions = this.createHasManyRepositoryFactoryFor('atencions', atencionRepositoryGetter,);
    this.registerInclusionResolver('atencions', this.atencions.inclusionResolver);
    this.pagoPlanes = this.createHasManyRepositoryFactoryFor('pagoPlanes', pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPlanes', this.pagoPlanes.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
