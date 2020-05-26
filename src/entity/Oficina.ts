/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:38
 * @modify date 2020-05-17 18:24:38
 * @desc Oficinas por medico
 */

import { Entity, Index, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { doctor as Doctor } from './doctor';
// import { Especializacion } from './Especializacion';
import { oficina_horario } from './oficina_horario';

@Entity('oficina')
@Index(['id'], { unique: true })
export class Oficina extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() tiempo_por_cliente_minutos: String;
  @Column() costo_primera_consulta: String;
  @Column() costo_consulta: String;
  @Column() direccion: String;
  @Column() ciudad: String;
  @Column() provincia: String;
  @Column() pais: String;
  @Column() codigo_zip: String;
  @Column() referencias_fisicas: String;
  @Column() longitud: String;
  @Column() latitud: String;
  @Column() doctor_id: Number;

  @ManyToOne(_type => Doctor, doctor => doctor.oficinas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  medico: Doctor;

  // TODO: Está dando errores
  // @ManyToMany(_type => Especializacion, especializacion => especializacion.oficinas)
  // @JoinTable({ name: 'oficina_especializaciones' })
  // especializaciones: Especializacion[];

  @OneToMany(_type => oficina_horario, oficina_horario => oficina_horario.oficina)
  horarios: oficina_horario[];
}
