/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:10
 * @modify date 2020-05-17 18:24:10
 * @desc [description]
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //createConnection
import { validate } from 'class-validator';
import { doctor } from '../entity/doctor';

import { Reservas } from '../entity/Reservas';
// import { Oficina } from '../entity/Oficina';
// import { Cliente } from '../entity/Cliente'

class ReservasController {
  static getReservasbyMedico = async (req: Request, res: Response) => {
    // Get the ID from the url
    console.log(req.body, req.params);
    const id: number = parseInt(req.params.id);
    //Get the user from database
    // const oficinaRepository = getRepository(Oficina);
    const reservasRepository = getRepository(Reservas);
    try {
      // let connection = await createConnection({ entities: [Reservas, Cliente] })
      //   .getRepository(Reservas)
      //   .createQueryBuilder("user")
      //   .leftJoinAndSelect("user.photos", "photo")
      //   .getMany();

      // const oficinas = await oficinaRepository.find({ select: ['id'], where: { doctor_id: id } });
      // const reservas = await reservasRepository.find({
      //   select: [
      //     'id',
      //     'inicio',
      //     'fin',
      //     'fecha_reserva',
      //     'disponible',
      //     'razon_no_disponibilidad',
      //     'canal_reserva',
      //     'estado_reserva',
      //     'transaction_id',
      //     'phone_number',
      //     'especializacion_id',
      //     'cliente',
      //   ],
      //   relations: ['cliente', 'oficina'],
      //   where: { oficina: { doctor_id: id } },
      // });

      // try {



      const reserva = await reservasRepository
        .createQueryBuilder('r')
        .select(['r.id', 'r.inicio', 'r.fin', 'o.id'])
        .addSelect('c.nombres')
        .addSelect('c.apellidos')
        .innerJoin('oficina', 'o', 'r.oficina_id=o.id')
        .innerJoin('doctor', 'd', 'o.doctor_id = d.id')
        .innerJoin('cliente', 'c', 'r.cliente_id = c.id')
        .where('d.id = :id', { id })
        .getMany();

      console.log('salida /api/oficinas/getHorariosByDoctor', reserva, id);
      res.status(200).send({ transaccion: true, data: reserva });
    } catch (error) {
      res.status(200).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
  static editMedico = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = parseInt(req.params.id);

    //Get values from the body
    const {
      activado = false,
      nombres = '',
      apellidos = '',
      titulo_honorifico = '',
      declaracion_profesional = '',
      numero_telefono = '',
      practica_desde = '',
    } = req.body;

    if (!(!!nombres && apellidos && !!titulo_honorifico && !!declaracion_profesional && !!numero_telefono && !!practica_desde)) {
      res.status(200).send({ transaccion: false, mensaje: 'Debe enviar todos los campos', error: '' });
    }
    console.log('31 ingresa ', req.body);
    //Try to find user on database
    const medicoRepository = getRepository(doctor);
    let medico;
    try {
      medico = await medicoRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(200).send({ transaccion: false, mensaje: 'Medico no encontrado', error });
      return;
    }
    console.log('42 ingresa ', medico);
    //Validate the new values on model
    medico.activado = activado;
    medico.nombres = nombres;
    medico.apellidos = apellidos;
    medico.titulo_honorifico = titulo_honorifico;
    medico.declaracion_profesional = declaracion_profesional;
    medico.numero_telefono = numero_telefono;
    medico.practica_desde = practica_desde;

    const errors = await validate(medico);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to safe, if fails, that means username already in use
    try {
      medico = await medicoRepository.save(medico);
    } catch (e) {
      console.log(e);
      res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: e, medico });
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(200).send({ transaccion: true, data: medico });
  };
}

export default ReservasController;
