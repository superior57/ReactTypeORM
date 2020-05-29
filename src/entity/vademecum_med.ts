/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:33
 * @modify date 2020-05-17 18:24:33
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { doctor as Doctor } from './doctor';

@Entity('vademecum_med')
@Index(['id'], { unique: true })
export class vademecum_med extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) nombre: String;
  @Column({ nullable: false }) composicion: String;
  @Column({ nullable: false }) funcion: String;
  @Column({ nullable: false }) presentacion: String;
  @Column({ nullable: false }) dosificacion: String;
  @Column({ nullable: false }) casa_comercial: String;
  @Column({ nullable: false }) contraindicaciones: String;
  @Column({ nullable: true }) notas: String;
  @Column({ nullable: true }) urlimagen: String;

  @Column() doctor_id: Number;

  @ManyToOne(_type => Doctor, doctor => doctor.oficinas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  medico: Doctor;
}
