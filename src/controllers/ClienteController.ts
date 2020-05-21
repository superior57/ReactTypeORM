/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Cliente } from '../entity';

class ClienteController {
  static getOneById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      console.log('Entrada /api/clientes/getOneById', id);
      const clienteRepository = getRepository(Cliente);

      const cliente = await clienteRepository.findOneOrFail({
        select: ['id', 'nombres', 'apellidos', 'cedula_identidad', 'sexo', 'telefono'],
        where: { cedula_identidad: id },
      });
      console.log('Salida /api/clientes/getOneById', cliente);
      res.status(200).send({ transaccion: true, data: cliente });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };
}
export default ClienteController;
