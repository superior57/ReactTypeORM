import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { receta } from './receta';

@Entity('receta_detalle')
@Index(['id'], { unique: true })
export class recetaDetalle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() medicamento: string;
  @Column() titulo: string;
  @Column() cantidad: string;
  @Column() dosificacion: string;

  @ManyToOne(_type => receta, receta => receta.detalle)
  @JoinColumn({ name: 'receta_id' })
  cabecera: receta;
}
