import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consulta, ConsultaRelations, ProveedorContratista, Mascota} from '../models';
import {ProveedorContratistaRepository} from './proveedor-contratista.repository';
import {MascotaRepository} from './mascota.repository';

export class ConsultaRepository extends DefaultCrudRepository<
  Consulta,
  typeof Consulta.prototype.id,
  ConsultaRelations
> {

  public readonly proveedorContratista: BelongsToAccessor<ProveedorContratista, typeof Consulta.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof Consulta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorContratistaRepository') protected proveedorContratistaRepositoryGetter: Getter<ProveedorContratistaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Consulta, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.proveedorContratista = this.createBelongsToAccessorFor('proveedorContratista', proveedorContratistaRepositoryGetter,);
    this.registerInclusionResolver('proveedorContratista', this.proveedorContratista.inclusionResolver);
  }
}
