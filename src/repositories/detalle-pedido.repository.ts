import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallePedido, DetallePedidoRelations, Pedido, ProductoServicio} from '../models';
import {PedidoRepository} from './pedido.repository';
import {ProductoServicioRepository} from './producto-servicio.repository';

export class DetallePedidoRepository extends DefaultCrudRepository<
  DetallePedido,
  typeof DetallePedido.prototype.id,
  DetallePedidoRelations
> {

  public readonly pedido: BelongsToAccessor<Pedido, typeof DetallePedido.prototype.id>;

  public readonly productoServicio: BelongsToAccessor<ProductoServicio, typeof DetallePedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('ProductoServicioRepository') protected productoServicioRepositoryGetter: Getter<ProductoServicioRepository>,
  ) {
    super(DetallePedido, dataSource);
    this.productoServicio = this.createBelongsToAccessorFor('productoServicio', productoServicioRepositoryGetter,);
    this.registerInclusionResolver('productoServicio', this.productoServicio.inclusionResolver);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
