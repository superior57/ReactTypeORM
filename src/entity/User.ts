/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:46
 * @modify date 2020-05-17 18:24:46
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, UpdateDateColumn, BaseEntity } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() lastName: string;
  @Column() age: number;
  @Column() @Length(4, 20) username: string;
  @Column() @Length(4, 100) password: string;
  @Column() @IsNotEmpty() role: string;
  @Column() @CreateDateColumn() createdAt: Date;
  @Column() @UpdateDateColumn() updatedAt: Date;
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}