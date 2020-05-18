/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:38
 * @modify date 2020-05-17 18:24:38
 * @desc [description]
 */
// import { med_user } from './med_user'
//  ManyToOne, JoinColumn,

import { Entity, Index, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
@Index(["user_id", "authority_name"], { unique: true })
export class med_user_authority extends BaseEntity {
  @PrimaryColumn('int') user_id: Number;
  @PrimaryColumn('character') authority_name: string;


  // Verifiar realizar roles
  // @ManyToOne(_type => med_user)
  // @JoinColumn({ name: 'user_id' })
  // user: med_user

}

