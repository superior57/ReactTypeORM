/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { vademecum } from '../entity/vademecum';
import { validate } from 'class-validator';

class VademecumController {
  static getValuesSearched = async (req: Request, res: Response) => {
    try {
      const paramBusqueda = req.params.search;
      console.log('Entrada /api/vademecum/getValuesSearched', paramBusqueda);
      const vademecumRepository = getRepository(vademecum);

      const values = await vademecumRepository
        .createQueryBuilder('v')
        .where('v.nombre ~* :param or v.casa_comercial ~* :param', {
          param: paramBusqueda,
        })
        .getMany();

      console.log('Salida /api/vademecum/getValuesSearched', values);
      res.status(200).send({ transaccion: true, data: values });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      console.log('Entrada /api/vademecum/getAll', req);

      const vademecumRepository = getRepository(vademecum);
      const values = await vademecumRepository.find();

      console.log('Salida /api/vademecum/getAll', values);
      res.status(200).send({ transaccion: true, data: values });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
  };

  static setMedicinaById = async (req: Request, res: Response) => {
    const vademecumRepository = getRepository(vademecum);
    const id: number = parseInt(req.params.id); /// id de la medicina

    console.log('entrada body /api/oficinas/setMedicinaById', req.params.id);
    let newOficina: vademecum;
    if (!req.params.id) {
      try {
        newOficina = await vademecumRepository.findOneOrFail(id);
      } catch (error) {
        //If not found, send a 404 response
        res.status(404).send({ transaccion: false, mensaje: 'registro no encontrado', error });
        return;
      }
    } else {
      newOficina = new vademecum();
    }

    newOficina.nombre = req.body.nombre;
    newOficina.composicion = req.body.composicion;
    newOficina.funcion = req.body.funcion;
    newOficina.presentacion = req.body.presentacion;
    newOficina.dosificacion = req.body.dosificacion;
    newOficina.casa_comercial = req.body.casa_comercial;
    newOficina.contraindicaciones = req.body.contraindicaciones;
    newOficina.urlimagen = req.body.urlimagen;

    console.log('entrada body /api/oficinas/setMedicinaById', req.body);

    const errors = await validate(newOficina);
    if (errors.length > 0) {
      res.status(400).send({
        transaccion: false,
        mensaje: 'ocurrio un error guardando los datos, Intente nuevamente',
        error: errors,
      });
      return;
    }
    try {
      let medicina: vademecum | any;
      if (!req.params.id) {
        await vademecumRepository.save(newOficina);
        medicina = await vademecumRepository.createQueryBuilder('v').where('v.id = :id', { id }).getOne();
      } else {
        medicina = await vademecumRepository.save(newOficina);
      }
      console.log('salida /api/vadecum/setMedicinaById', medicina);
      res.status(200).send({ transaccion: true, data: medicina });
    } catch (error) {
      console.log('error /api/oficinas/setMedicinaById', error);
      res.status(409).send({
        transaccion: false,
        mensaje: 'ocurrio un error guardando los datos, Intente nuevamente',
        error: error,
      });
    }
    res.status(200).send({ transaccion: true });
  };
}
export default VademecumController;
