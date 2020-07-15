/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { vademecum } from "../entity/vademecum";
import { validate } from "class-validator";
import { vademecum_med } from "../entity/vademecum_med";

class VademecumController {
  static getValuesSearched = async (req: Request, res: Response) => {
    try {
      const paramBusqueda = req.params.search;
      console.log("Entrada /api/vademecum/getValuesSearched", paramBusqueda);
      const vademecumRepository = getRepository(vademecum);

      const values = await vademecumRepository
        .createQueryBuilder("v")
        .where(
          "v.nombre ~* :param or v.casa_comercial ~* :param or v.composicion ~* :param or v.funcion ~* :param or v.presentacion ~* :param or v.dosificacion ~* :param or v.contraindicaciones ~* :param",
          {
            param: paramBusqueda,
          }
        )
        .getMany();

      console.log("Salida /api/vademecum/getValuesSearched", values);
      res.status(200).send({ transaccion: true, data: values });
    } catch (error) {
      res
        .status(404)
        .send({
          transaccion: false,
          mensaje: "Error consultando",
          error: error,
        });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      console.log("Entrada /api/vademecum/getAll", req);

      const vademecumRepository = getRepository(vademecum);
      const values = await vademecumRepository.find();

      console.log("Salida /api/vademecum/getAll", values);
      res.status(200).send({ transaccion: true, data: values });
    } catch (error) {
      res
        .status(404)
        .send({
          transaccion: false,
          mensaje: "Error consultando",
          error: error,
        });
    }
  };

  //Se guarda o modificia en la tabla de vademecum_med
  static setMedicinaById = async (req: Request, res: Response) => {
    const vademecumRepository = getRepository(vademecum_med);
    const id: number = parseInt(req.params.id); /// id de la medicina

    console.log("entrada body /api/vademecum/setMedicinaById", req.params.id);
    let newOficina: vademecum_med | undefined;
    if (req.params.id) {
      try {
        console.log("tiene medicina");
        newOficina = await vademecumRepository.findOne(id);
      } catch (error) {
        //If not found, send a 404 response
        res
          .status(404)
          .send({
            transaccion: false,
            mensaje: "registro no encontrado",
            error,
          });
        return;
      }
    } else {
      console.log("no tiene medicina");
      newOficina = new vademecum_med();
    }

    newOficina!.nombre = req.body.nombre;
    newOficina!.composicion = req.body.composicion;
    newOficina!.funcion = req.body.funcion;
    newOficina!.presentacion = req.body.presentacion;
    newOficina!.dosificacion = req.body.dosificacion;
    newOficina!.casa_comercial = req.body.casa_comercial;
    newOficina!.contraindicaciones = req.body.contraindicaciones;
    newOficina!.notas = req.body.notas;
    newOficina!.urlimagen = req.body.urlimagen;
    newOficina!.doctor_id = req.body.doctor_id;

    console.log("entrada body /api/vademecum/setMedicinaById", req.body);

    const errors = await validate(newOficina!);
    if (errors.length > 0) {
      res.status(400).send({
        transaccion: false,
        mensaje: "ocurrio un error guardando los datos, Intente nuevamente",
        error: errors,
      });
      return;
    }
    try {
      await vademecumRepository.save(newOficina!);

      //Devuelvo todas las medicinas del doctor
      req.params.id = req.body.doctor_id;
      return VademecumController.getVadecumByDoctor(req, res);
    } catch (error) {
      console.log("error /api/vademecum/setMedicinaById", error);
      res.status(409).send({
        transaccion: false,
        mensaje: "ocurrio un error guardando los datos, Intente nuevamente",
        error: error,
      });
    }
  };

  //Obtiene todos los registros por doctor que tiene en su vadecum
  static getVadecumByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/getvadecumByDoctor", id);

    const vadecumRepository = getRepository(vademecum_med);

    try {
      const vadecum = await vadecumRepository
        .createQueryBuilder("vadecum")
        .where("vadecum.doctor_id = :id", { id })
        .getMany();

      console.log("salida /api/vadecum/getvadecumByDoctor", vadecum);

      res.status(200).send({ transaccion: true, data: vadecum });
    } catch (error) {
      console.log("error /api/vadecum/getvadecumByDoctor", error);
      res
        .status(404)
        .send({
          transaccion: false,
          mensaje: "Error consultando",
          error: error,
        });
    }
  };
}
export default VademecumController;
