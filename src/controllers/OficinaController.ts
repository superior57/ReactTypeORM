import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Oficina } from '../entity/Oficina';
import { oficina_horario } from '../entity/oficina_horario';
import { validate } from 'class-validator';

class OficinaController {
  static getOficinasByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('entrada /api/oficinas/getOficinasByDoctor', id);

    const oficinaRepository = getRepository(Oficina);

    try {
      const oficinas = await oficinaRepository.createQueryBuilder('oficina').where('oficina.doctor_id = :id', { id }).getMany();

      console.log('salida /api/oficinas/getOficinasByDoctor', oficinas);

      res.status(404).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log('error /api/oficinas/getOficinasByDoctor', error);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
  static setOficinasByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    //Get values from the body

    //Base entity no tiene constructores :(
    const newOficina = new Oficina();
    newOficina.tiempo_por_cliente_minutos = req.body.tiempo_por_cliente_minutos;
    newOficina.costo_primera_consulta = req.body.costo_primera_consulta;
    newOficina.costo_consulta = req.body.costo_consulta;
    newOficina.direccion = req.body.direccion;
    newOficina.ciudad = req.body.ciudad;
    newOficina.provincia = req.body.provincia;
    newOficina.pais = req.body.pais;
    newOficina.codigo_zip = req.body.codigo_zip;
    newOficina.referencias_fisicas = req.body.referencias_fisicas;
    newOficina.longitud = req.body.longitud;
    newOficina.latitud = req.body.latitud;
    newOficina.doctor_id = req.body.doctor_id;

    console.log('entrada body /api/oficinas/setOficinasByDoctor', req.body);

    const oficinaRepository = getRepository(Oficina);

    const errors = await validate(newOficina);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      await oficinaRepository.save(newOficina);

      //TODO: ver si se puede reutilizar la función getOficinasByDoctor para no repetir código
      const oficinas = await oficinaRepository.createQueryBuilder('oficina').where('oficina.doctor_id = :id', { id }).getMany();
      console.log('salida /api/oficinas/setOficinasByDoctor', oficinas);
      res.status(404).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log('error /api/oficinas/setOficinasByDoctor', error);
      res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: error });
    }
  };

  static getOficinasHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('entrada /api/oficinas/getOficinasByDoctor', id);

    const oficinaRepository = getRepository(Oficina);

    try {
      const oficinas = await oficinaRepository.find({ relations: ['horarios'], where: { doctor_id: id } });
      console.log('salida /api/oficinas/getOficinasByDoctor', oficinas);

      res.status(404).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log('error /api/oficinas/getOficinasByDoctor', error);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };

  static getHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('entrada /api/oficinas/getHorariosByDoctor', id);

    const oficina_horarioRepository = getRepository(oficina_horario);

    try {
      const horarios = await oficina_horarioRepository
        .createQueryBuilder('horario')
        .innerJoinAndSelect('oficina', 'o', 'horario.oficina_id = o.id')
        .select(['horario.id', 'horario.oficina_id', 'horario.dia_semana', 'horario.hora_inicio', 'horario.hora_fin'])
        .where('o.doctor_id = :id', { id })
        .getMany();

      console.log('salida /api/oficinas/getHorariosByDoctor', horarios);

      res.status(404).send({ transaccion: true, data: horarios });
    } catch (error) {
      console.log('error /api/oficinas/getHorariosByDoctor', error);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };

  static setHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('entrada /api/oficinas/setHorariosByDoctor', id);
    // const oficina_horarioRepository = getRepository(oficina_horario);

    try {
    } catch (error) {
      console.log('error /api/oficinas/setHorariosByDoctor', error);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
}
export default OficinaController;
