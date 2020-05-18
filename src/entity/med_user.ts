/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:42
 * @modify date 2020-05-17 18:24:42
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, UpdateDateColumn, BaseEntity } from "typeorm";
// ,Index
import { Length } from "class-validator";
//  IsNotEmpty, IsEmpty
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["login", "email"])
export class med_user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column() login: string;
  @Column() @Length(5, 200) password_hash: string;
  @Column() @Length(3, 50) first_name: string;
  @Column() @Length(3, 50) last_name: string;
  @Column() @Length(5, 191) email: String
  @Column({ nullable: true }) image_url: String
  @Column() activated: Boolean
  @Column() lang_key: String
  @Column() activation_key: String
  @Column() reset_key: String
  @Column({ default: () => 'newBack' }) created_by: String
  @Column() last_modified_by: String
  @Column() @UpdateDateColumn() reset_date: Date
  @Column() @CreateDateColumn() created_date: Date
  @Column() @UpdateDateColumn() last_modified_date: Date

  hashPassword() {
    this.password_hash = bcrypt.hashSync(this.password_hash, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password_hash);
  }
}

