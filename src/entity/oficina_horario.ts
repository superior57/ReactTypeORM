/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:38
 * @modify date 2020-05-17 18:24:38
 * @desc Horarios de atencion de las oficinas por medico
 */

import { Entity, Index, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Oficina } from './Oficina';

@Entity()
@Index(['id'], { unique: true })
export class oficina_horario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() dia_semana: String;
  @Column() hora_inicio: String;
  @Column() hora_fin: String;
  @Column() oficina_id: Number;

  @ManyToOne(_type => Oficina, Oficina => Oficina.horarios)
  @JoinColumn({ name: 'oficina_id' })
  oficina: Oficina;
}
