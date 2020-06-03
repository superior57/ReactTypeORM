import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { receta } from '../entity/receta';
import { recetaDetalle } from '../entity/receta_detalle';

class RecetaController {
  static getRecetaClienteDoctor = async (req: Request, res: Response) => {
    const cliente: number = parseInt(req.params.cliente);
    const doctor: number = parseInt(req.params.doctor);
    console.log('entrada para /recetas/getRecetaClienteDoctor', req.params);
    const recetaRepository = getRepository(receta);

    try {
      const recetas = await recetaRepository.find({
        where: { doctor_id: doctor, cliente_id: cliente },
        relations: ['detalle'],
      });
      res.status(404).send({ transaccion: true, data: recetas });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando' });
    }
  };
  static setRecetaClienteDoctor = async (req: Request, res: Response) => {
    const cliente: number = parseInt(req.params.cliente);
    const doctor: number = parseInt(req.params.doctor);
    //detalles tiene que ser un array de objetos
    const detalles = req.body;

    const recetaRepository = getRepository(receta);
    const detalleRepository = getRepository(recetaDetalle);
    try {
      const cabecera = new receta();
      cabecera.cliente_id = cliente;
      cabecera.doctor_id = doctor;
      cabecera.mostrar_cabecera = false;
      await recetaRepository.save(cabecera);

      let array_detalles: Array<recetaDetalle> = [];
      detalles.forEach(
        async (detalle: { medicamento: string; titulo: string; cantidad: string; dosificacion: string }) => {
          const un_detalle = new recetaDetalle();
          un_detalle.medicamento = detalle.medicamento;
          un_detalle.titulo = detalle.titulo;
          un_detalle.cantidad = detalle.cantidad;
          un_detalle.dosificacion = detalle.dosificacion;
          un_detalle.cabecera = cabecera;
          await detalleRepository.save(un_detalle);
          array_detalles.push(un_detalle);
        }
      );

      req.params.cliente = `${cliente}`;
      req.params.doctor = `${doctor}`;
      return RecetaController.getRecetaClienteDoctor(req, res);
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error al guardar registro' + error });
    }
  };
}

export default RecetaController;
