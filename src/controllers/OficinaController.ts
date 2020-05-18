import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Oficina } from '../entity/Oficina';

class OficinaController {
  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log('/api/oficinas', id);

    const oficinaRepository = getRepository(Oficina);

    try {
      const oficinas = await oficinaRepository.find({ relations: ['medico'], where: { doctor_id: id } });

      res.status(404).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log('/api/oficinas', id);
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
}
export default OficinaController;
