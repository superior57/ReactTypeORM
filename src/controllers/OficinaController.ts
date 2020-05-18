import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Oficina } from '../entity/Oficina';

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

  static getHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('entrada /api/oficinas/getHorariosByDoctor', id);

    const oficinaRepository = getRepository(Oficina);

    try {
      const horarios = await oficinaRepository
        .createQueryBuilder('oficina')
        .innerJoinAndSelect('oficina.horarios', 'horarios')
        .where('oficina.doctor_id = :id', { id })
        .getMany();

      console.log('salida /api/oficinas/getHorariosByDoctor', horarios);

      res.status(404).send({ transaccion: true, data: horarios });
    } catch (error) {
      console.log('error /api/oficinas/getHorariosByDoctor', error);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
}
export default OficinaController;
