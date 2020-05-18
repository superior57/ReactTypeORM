/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:33
 * @modify date 2020-05-17 18:24:33
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, BaseEntity } from "typeorm";
// ,Index
// import { Length } from "class-validator";

import { Oficina } from "./Oficina";

@Entity('especializacion')
@Index(["id"], { unique: true })
export class Especializacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() nombre: string;


  @ManyToMany(_type => Oficina, oficina => oficina.especializaciones)
  oficinas: Oficina[]



}
