import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Atencion, AtencionRelations, Mascota, Asesor} from '../models';
import {MascotaRepository} from './mascota.repository';
import {AsesorRepository} from './asesor.repository';

export class AtencionRepository extends DefaultCrudRepository<
  Atencion,
  typeof Atencion.prototype.id,
  AtencionRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Atencion.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Atencion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Atencion, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
