/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:33
 * @modify date 2020-05-17 18:24:33
 * @desc [description]
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Index, BaseEntity, JoinColumn } from 'typeorm';
// ,Index
// import { Length } from "class-validator";
import { med_user } from './med_user';

@Entity('cliente')
@Index(['id'], { unique: true })
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() cedula_identidad: string;
  @Column() cedula_representante: String;
  @Column() titulo_honorifico: String;
  @Column({ nullable: false, type: 'varchar' }) nombres: String;
  @Column({ nullable: false, type: 'varchar' }) apellidos: String;
  @Column({ nullable: true }) nombres_padre: String;
  @Column({ nullable: true }) nombres_madre: String;
  @Column({ nullable: true }) direccion: String;
  @Column({ nullable: true }) ciudad: String;
  @Column({ nullable: true }) pais: String;
  @Column({ nullable: true }) sexo: String;
  @Column({ nullable: true }) telefono: String;
  @Column({ nullable: true }) celular: String;
  @Column({ nullable: true }) fecha_nacimiento: String;
  @Column({ nullable: true }) tipo_sangre: String;
  @Column({ nullable: true }) foto_perfil: String;
  @Column({ nullable: true }) foto_perfil_content_type: String;
  @Column({ nullable: true }) total_creditos: String;
  
  @OneToOne(_type => med_user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: med_user;
}
