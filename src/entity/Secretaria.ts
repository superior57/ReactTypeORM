/**
 * @author [jpcapelo]
 * @email [jhonnathanp27@gmail.com]
 * @create date 2020-07-15
 * @modify date 2020-07-15
 * @desc [description]
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BaseEntity,
} from "typeorm";
// ,Index
// import { Length } from "class-validator";

@Entity("secretaria")
@Index(["id"], { unique: true })
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() titulo_honorifico: string;
  @Column({ nullable: false, type: "varchar" }) foto_nombre: String;
}
