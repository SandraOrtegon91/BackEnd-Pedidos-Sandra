import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoServicio, ProductoServicioRelations, DetallePedido, ProveedorContratista} from '../models';
import {DetallePedidoRepository} from './detalle-pedido.repository';
import {ProveedorContratistaRepository} from './proveedor-contratista.repository';

export class ProductoServicioRepository extends DefaultCrudRepository<
  ProductoServicio,
  typeof ProductoServicio.prototype.id,
  ProductoServicioRelations
> {

  public readonly detallePedidos: HasManyRepositoryFactory<DetallePedido, typeof ProductoServicio.prototype.id>;

  public readonly proveedorContratistas: HasManyRepositoryFactory<ProveedorContratista, typeof ProductoServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>, @repository.getter('ProveedorContratistaRepository') protected proveedorContratistaRepositoryGetter: Getter<ProveedorContratistaRepository>,
  ) {
    super(ProductoServicio, dataSource);
    this.proveedorContratistas = this.createHasManyRepositoryFactoryFor('proveedorContratistas', proveedorContratistaRepositoryGetter,);
    this.registerInclusionResolver('proveedorContratistas', this.proveedorContratistas.inclusionResolver);
    this.detallePedidos = this.createHasManyRepositoryFactoryFor('detallePedidos', detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('detallePedidos', this.detallePedidos.inclusionResolver);
  }
}
