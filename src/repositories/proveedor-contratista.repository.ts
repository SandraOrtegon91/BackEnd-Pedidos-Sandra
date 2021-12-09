import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProveedorContratista, ProveedorContratistaRelations, ProductoServicio, Consulta} from '../models';
import {ProductoServicioRepository} from './producto-servicio.repository';
import {ConsultaRepository} from './consulta.repository';

export class ProveedorContratistaRepository extends DefaultCrudRepository<
  ProveedorContratista,
  typeof ProveedorContratista.prototype.id,
  ProveedorContratistaRelations
> {

  public readonly productoServicio: BelongsToAccessor<ProductoServicio, typeof ProveedorContratista.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof ProveedorContratista.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoServicioRepository') protected productoServicioRepositoryGetter: Getter<ProductoServicioRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>,
  ) {
    super(ProveedorContratista, dataSource);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.productoServicio = this.createBelongsToAccessorFor('productoServicio', productoServicioRepositoryGetter,);
    this.registerInclusionResolver('productoServicio', this.productoServicio.inclusionResolver);
  }
}
