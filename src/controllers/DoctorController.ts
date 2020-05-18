/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:10
 * @modify date 2020-05-17 18:24:10
 * @desc [description]
 */
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { doctor } from "../entity/doctor";

class DoctorController {
  static getOneById = async (req: Request, res: Response) => {
    // Get the ID from the url
    console.log(req.body, req.params)
    const id: number = parseInt(req.params.id);
    //Get the user from database
    const medicoRepository = getRepository(doctor);
    //     const userRepository = connection.getRepository(User);
    // const users = await userRepository.find({ relations: ["photos"] });
    try {
      const oficinas = await medicoRepository.find({ relations: ["oficinas"], where: { id: id }, });
      console.log('Oficinas', oficinas)
      // const medico = await medicoRepository.findOneOrFail(id);
      res.status(404).send({ transaccion: true, data: oficinas });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    };
  }
  static editMedico = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = parseInt(req.params.id);

    //Get values from the body
    const { activado = false, nombres = '', apellidos = '', titulo_honorifico = '', declaracion_profesional = '', numero_telefono = '', practica_desde = '' } = req.body;

    if (!(!!nombres && apellidos && !!titulo_honorifico && !!declaracion_profesional && !!numero_telefono && !!practica_desde)) {
      res.status(404).send({ transaccion: false, mensaje: 'Debe enviar todos los campos', error: '' });
    }
    console.log('31 ingresa ', req.body)
    //Try to find user on database
    const medicoRepository = getRepository(doctor);
    let medico;
    try {
      medico = await medicoRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send({ transaccion: false, mensaje: 'Medico no encontrado', error });
      return;
    }
    console.log('42 ingresa ', medico)
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
      console.log(e)
      res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: e, medico });
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(200).send({ transaccion: true, data: medico });
  };
}

export default DoctorController