/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:33
 * @modify date 2020-05-17 18:24:33
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Index, OneToMany, BaseEntity, JoinColumn } from "typeorm";
// ,Index
// import { Length } from "class-validator";
import { med_user } from "./med_user"
import { Oficina } from "./Oficina";

@Entity()
@Index(["id"], { unique: true })
export class doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "varchar" }) titulo_honorifico: string;

  @Column() nombres: string;
  @Column() apellidos: string;

  @Column({ nullable: true, type: "varchar" }) declaracion_profesional: string;

  @Column({ nullable: true, type: "varchar" }) practica_desde: Date
  @Column({ nullable: true, type: "varchar" }) numero_telefono: String
  // @Column() foto_perfil: byte
  // @Column() foto_perfil_content_type: char
  @Column({ nullable: true, type: "varchar" }) activado: Boolean

  @OneToOne(_type => med_user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: med_user


  @OneToMany(_type => Oficina, oficina => oficina.medico)
  oficinas: Oficina[]



}