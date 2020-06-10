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
        order: {
          id: 'DESC',
        },
      });
      res.status(200).send({ transaccion: true, data: recetas });
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error consultando' });
    }
  };

  static setRecetaClienteDoctor = async (req: Request, res: Response) => {
    const cliente: number = parseInt(req.params.cliente);
    const doctor: number = parseInt(req.params.doctor);
    //detalles tiene que ser un array de objetos
    const { detalles, mediciones } = req.body;
    console.log('BODY', req.body);
    const recetaRepository = getRepository(receta);
    const detalleRepository = getRepository(recetaDetalle);
    try {
      const cabecera = new receta();
      cabecera.cliente_id = cliente;
      cabecera.doctor_id = doctor;
      cabecera.created_date = new Date();
      cabecera.mostrar_cabecera = false;
      cabecera.peso = mediciones.peso;
      cabecera.talla = mediciones.talla;
      cabecera.cie10 = mediciones.cie;
      cabecera.imc = mediciones.imc;
      await recetaRepository.save(cabecera);

      // con esto espera a que guarde todos los detalles
      await Promise.all(
        detalles.map(
          async (detalle: {
            medicina: { nombre: string; composicion: any; casa_comercial: any };
            cantidad: string;
            dosificacion: string;
          }) => {
            const un_detalle = new recetaDetalle();
            un_detalle.medicamento = detalle.medicina.nombre;
            un_detalle.titulo = detalle.medicina.composicion + detalle.medicina.casa_comercial;
            un_detalle.cantidad = detalle.cantidad;
            un_detalle.dosificacion = detalle.dosificacion;
            un_detalle.cabecera = cabecera;
            await detalleRepository.save(un_detalle);
          }
        )
      );
      return RecetaController.getRecetaClienteDoctor(req, res);
    } catch (error) {
      res.status(404).send({ transaccion: false, mensaje: 'Error al guardar registro' + error });
    }
  };
}

export default RecetaController;
