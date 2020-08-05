/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:42
 * @modify date 2020-05-17 18:24:42
 * @desc [description]
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
// ,Index
import { Length } from "class-validator";
//  IsNotEmpty, IsEmpty
import * as bcrypt from "bcryptjs";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
@Unique(["login", "email"])
export class med_user extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field() @Column() login: string;
  @Field() @Column() @Length(3, 50) first_name: string;
  @Field() @Column() @Length(3, 50) last_name: string;
  @Field() @Column() @Length(5, 191) email: string;
  @Column({ nullable: true }) image_url: string;
  @Field() @Column() activated: Boolean;
  @Field() @Column() lang_key: string;
  @Field() @Column() activation_key: string;
  @Field() @Column() reset_key: string;
  @Field() @Column({ default: () => "newBack" }) created_by: string;
  @Field() @Column() last_modified_by: string;
  @Field() @Column() @UpdateDateColumn() reset_date: Date;
  @Field() @Column() @CreateDateColumn() created_date: Date;
  @Field() @Column() @UpdateDateColumn() last_modified_date: Date;

  @Field() @Column() @Length(5, 200) password_hash: string;
  
  hashPassword() {
    this.password_hash = bcrypt.hashSync(this.password_hash, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password_hash);
  }
}
