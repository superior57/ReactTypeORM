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
      // Get the ID from the url
      console.log(req.body, req.params);
      const id = req.params.id;
      //Get the user from database
      const clienteRepository = getRepository(Cliente);
      //     const userRepository = connection.getRepository(User);
      // const users = await userRepository.find({ relations: ["photos"] });
      const cliente = await clienteRepository.findOneOrFail({ select: ["nombres", "apellidos", "cedula_identidad", "sexo", "telefono"], where: { cedula_identidad: id } });
      console.log('Oficinas', cliente);
      // const medico = await medicoRepository.findOneOrFail(id);
      res.status(200).send({ transaccion: true, data: cliente });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  }
}
export default ClienteController