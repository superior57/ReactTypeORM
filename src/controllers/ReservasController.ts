/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:10
 * @modify date 2020-05-17 18:24:10
 * @desc [description]
 */
import { Request, Response } from "express";
import { getRepository } from "typeorm"; //createConnection
import { validate } from "class-validator";
import { doctor } from "../entity/doctor";

import { Reservas } from "../entity/Reservas";

// import { Oficina } from '../entity/Oficina';
// import { Cliente } from '../entity/Cliente'

class ReservasController {
  static getReservasbyMedico = async (req: Request, res: Response) => {
    console.log(req.body, req.params);
    const id: number = parseInt(req.params.id);

    const reservasRepository = getRepository(Reservas);
    try {
      const reserva = await reservasRepository
        .createQueryBuilder("r")
        .innerJoinAndSelect("oficina", "o", "r.oficina_id=o.id")
        .innerJoinAndSelect("doctor", "d", "o.doctor_id = d.id")
        .innerJoinAndSelect("cliente", "c", "r.cliente_id = c.id")
        .select([
          "r",
          "c.cedula_identidad identidad",
          "c.apellidos apellidos",
          "c.nombres nombres",
          "o.id oficina_id",
        ])
        .orderBy("r.inicio", "ASC")
        .where("d.id = :id", { id })
        .getRawMany();

      console.log("salida /api/oficinas/getHorariosByDoctor", reserva, id);
      res.status(200).send({ transaccion: true, data: reserva });
    } catch (error) {
      res.status(400).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };

  static setReservaByOficina = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const {
      inicio,
      fin,
      fecha_reserva,
      disponible,
      razon_no_disponibilidad,
      // canal_reserva,
      // estado_reserva,
      phone_number,
      especializacion_id,
      cliente_id,
      doctor_id,
    } = req.body;
    console.log("Entrada reserva", req.body);
    const reservasRepository = getRepository(Reservas);
    let nuevaReserva: Reservas = new Reservas();
    try {
      nuevaReserva.inicio = inicio;
      nuevaReserva.fin = fin;
      nuevaReserva.fecha_reserva = fecha_reserva;
      nuevaReserva.disponible = disponible;
      nuevaReserva.razon_no_disponibilidad = razon_no_disponibilidad;
      nuevaReserva.canal_reserva = "APP_MOVIL";
      nuevaReserva.estado_reserva = "PAGADO";
      nuevaReserva.phone_number = phone_number;
      nuevaReserva.especializacion_id = especializacion_id;
      nuevaReserva.cliente_id = cliente_id;
      nuevaReserva.oficina_id = id;

      await reservasRepository.save(nuevaReserva);

      req.params.id = doctor_id;
      return ReservasController.getReservasbyMedico(req, res);
    } catch (error) {
      res.status(400).send({
        transaccion: false,
        mensaje: "Error guardando los datos",
        error: error,
      });
    }
  };

  static editMedico = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = parseInt(req.params.id);

    //Get values from the body
    const {
      activado = false,
      nombres = "",
      apellidos = "",
      titulo_honorifico = "",
      declaracion_profesional = "",
      numero_telefono = "",
      practica_desde = "",
    } = req.body;

    if (
      !(
        !!nombres &&
        apellidos &&
        !!titulo_honorifico &&
        !!declaracion_profesional &&
        !!numero_telefono &&
        !!practica_desde
      )
    ) {
      res.status(200).send({
        transaccion: false,
        mensaje: "Debe enviar todos los campos",
        error: "",
      });
    }
    console.log("31 ingresa ", req.body);
    //Try to find user on database
    const medicoRepository = getRepository(doctor);
    let medico;
    try {
      medico = await medicoRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res
        .status(200)
        .send({ transaccion: false, mensaje: "Medico no encontrado", error });
      return;
    }
    console.log("42 ingresa ", medico);
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
      res.status(409).send({
        transaccion: false,
        mensaje: "ocurrio un error guardando los datos, Intente nuevamente",
        error: e,
        medico,
      });
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(200).send({ transaccion: true, data: medico });
  };
}

export default ReservasController;
