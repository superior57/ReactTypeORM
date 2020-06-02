/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:10
 * @modify date 2020-05-17 18:24:10
 * @desc [description]
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { receta } from '../entity/receta';

class RecetaController {
  static getRecetaClienteDoctor = async (req: Request, res: Response) => {
    const cliente: number = parseInt(req.params.cliente);
    const doctor: number = parseInt(req.params.doctor);

    const recetaRepository = getRepository(receta);

    try {
      const recetas = await recetaRepository
        .createQueryBuilder('cabecera')
        .innerJoin('receta_detalle', 'detalle', 'cabecera.id = detalle.receta_id')
        .where('cabecera.cliente_id = :cliente and cabecera.doctor_id = :doctor', {
          cliente,
          doctor,
        })
        .select(['cabecera', 'detalle'])
        .getRawMany();

      res.status(404).send({ transaccion: true, data: recetas });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error.menssage });
    }
  };
}

export default RecetaController;
