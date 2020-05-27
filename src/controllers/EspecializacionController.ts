/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Especializacion } from '../entity/Especializacion';

class EspecializacionController {
  static getAll = async (req: Request, res: Response) => {
    try {
      console.log('Entrada /api/especializacion/getAll', req);

      const EspecializacionRepository = getRepository(Especializacion);

      const especializaciones = await EspecializacionRepository.find();
      console.log('Salida /api/especializacion/getAll', especializaciones);
      res.status(200).send({ transaccion: true, data: especializaciones });
    } catch (error) {
      res
        .status(404)
        .send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
}
export default EspecializacionController;
