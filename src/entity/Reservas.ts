/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:38
 * @modify date 2020-05-17 18:24:38
 * @desc Reservas de clientes
 */

import { Entity, Index, BaseEntity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Oficina } from './Oficina';

@Entity('reserva')
@Index(['id', 'transaction_id'], { unique: true })
export class Reservas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time without time zone' }) inicio: Date;
  @Column({ type: 'time without time zone' }) fin: Date;
  @Column() fecha_reserva: Date;
  @Column() disponible: Boolean;
  @Column() razon_no_disponibilidad: String;
  @Column() canal_reserva: String;
  @Column() estado_reserva: String;
  @Column() transaction_id: Number;
  @Column() phone_number: String;
  @Column() especializacion_id: Number;
  @Column() oficina_id: Number;
  @Column() cliente_id: Number;

  @OneToOne(_type => Oficina, { eager: true })
  @JoinColumn({ name: 'oficina_id' })
  oficina: Oficina;

  @OneToOne(_type => Cliente, { eager: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
