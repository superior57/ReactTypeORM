import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, OneToMany } from 'typeorm';
import { recetaDetalle } from './receta_detalle';

@Entity('receta')
@Index(['id'], { unique: true })
export class receta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() created_date: Date;
  @Column() cliente_id: number;
  @Column() doctor_id: number;
  @Column() mostrar_cabecera: boolean;
  @Column() peso: string;
  @Column() talla: string;
  @Column() cie10: string;
  @Column() imc: string;

  @OneToMany(_type => recetaDetalle, detalle => detalle.cabecera)
  detalle: recetaDetalle[];
}
