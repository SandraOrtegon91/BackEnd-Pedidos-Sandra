import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Atencion, Mascota, Administrador} from '../models';
import {AtencionRepository} from './atencion.repository';
import {MascotaRepository} from './mascota.repository';
import {AdministradorRepository} from './administrador.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly atencions: HasManyRepositoryFactory<Atencion, typeof Asesor.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Asesor.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AtencionRepository') protected atencionRepositoryGetter: Getter<AtencionRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Asesor, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.atencions = this.createHasManyRepositoryFactoryFor('atencions', atencionRepositoryGetter,);
    this.registerInclusionResolver('atencions', this.atencions.inclusionResolver);
  }
}
